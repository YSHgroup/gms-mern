import { User } from "@/models/userModel";
import {
  loginValidator,
  registrationValidator,
} from "@/validator/authValidator";
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { checkEnrollmentUniqueness } from "@/utils/confirmEnrollment";

const router = Router();
const secret_key = process.env.SECRET_KEY ?? "sh";

router.post("/register", (req: Request, res: Response) => {
  const validationResult = registrationValidator(req.body);
  if (!validationResult.pass) {
    res
      .status(400)
      .json({ errorType: "validation_error", msg: validationResult.error! });
    return;
  }

  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        res.status(400).json({
          errorType: "existence_error",
          msg: ["The user with this email exists already."],
        });
      } else {
        throw Error("non existence");
      }
    })
    .catch(async (err) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({ ...req.body, password: hashedPwd });
      if(req.body.role == 'user') {
        const uniqueEnrollment = await checkEnrollmentUniqueness(req.body.enrollment)
        if(uniqueEnrollment) {
          res.status(400).json({
            errorType: "existence_error",
            msg: ["The enrollment exists already."]
          })
          return
        }
      }
      newUser
        .save()
        .then((result) => {
          res.status(201).json({ msg: "Registered successfuly." });
        })
        .catch((err) => {
          res.status(500).json({ errorType: "Internal", msg: [err.message] });
        });
    });
});

router.post("/login", (req: Request, res: Response) => {
  const validationResult = loginValidator(req.body);
  if (!validationResult.pass) {
    res
      .status(400)
      .json({ errorType: "validation_error", msg: validationResult.error! });
    return;
  }

  User.findOne({ email: req.body.email })
    .then(async (result) => {
      if(!result) throw Error('No such User')
      if(result.role !=="grant_dir" && !result.allowed) {
        res.status(400).json({errorType: 'permission', msg: ["It has not yet been approved by the administrator."]})
        return
      }

      const verifyPassword = await bcrypt.compare(
        req.body.password,
        result!.password
      );

      if (verifyPassword) {
        try {
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
              email: result?.email,
              role: result.role
            },
            secret_key
          );
          const refreshToken = sign(
            { email: result!.email },
            secret_key,
            { expiresIn: "60d" }
          );

          result.refreshToken = refreshToken;
          await result!.save();

          res.status(200).json({
            user: {
              userName: `${result?.firstName} ${result?.lastName}`,
              email: result!.email,
            },
            token: token,
            refresh: refreshToken,
          });
        } catch (err) {
          if (err) {
            console.log(err)
            res.status(500).json({ errorType: "Internal", msg: [err] });
          }
        }
      } else {
        res.status(400).json({errorType: "bad", msg: ['Incorrect password.']})
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json({ errorType: "existence", msg: ["Unregistered Email."] });
    });
});

router.post("/refresh-token", async (req: Request, res: Response) => {
  const { token } = req.body; 
  if (!token) {
    res.sendStatus(401);
    return;
  } // Unauthorized

  try {
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      res.sendStatus(403);
      return;
    } // Forbidden

    verify(token, secret_key, (err: any, decoded: any) => {
      if (err) {
        res.sendStatus(403);
        return;
      } // Forbidden

      const newToken = sign({ role: user.role, email: user.email }, secret_key, { expiresIn: "30d" });
      res.json({ token: newToken });
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      res.sendStatus(403);
      return;
    }

    user.refreshToken = null;
    await user.save();
    res.sendStatus(204); // No Content
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

export { router as authRouter };
