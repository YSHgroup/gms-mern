import { User } from "@/models/userModel";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/:email", (req: any, res: Response) => {
  User.findOne({ email: req.params.email }, '_id firstName lastName email department role')
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ msg: [err.message] });
    });
});

router.put("/:email", (req: any, res: Response) => {
  if ((req.tokenUser.role = "grant_dir")) {
    const { firstName, lastName, email } = req.body;

    User.findOneAndUpdate(
      { email: req.params.email },
      {
        $set: {
          firstName,
          lastName,
          email,
        },
      }
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ msg: [error.message] });
      });
  } else {
    const { firstName, lastName } = req.body;

    User.findOneAndUpdate(
      { email: req.params.email },
      {
        $set: {
          firstName,
          lastName,
        },
      }
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({ msg: [error.message] });
      });
  }
});

router.put("/password/:email", async (req: any, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  User.findOne({ email: req.params.email })
    .then(async (result) => {
      if (!result) {
        throw new Error("No such user");
      }
      const verifyPassword = await bcrypt.compare(
        currentPassword,
        result!.password
      );
      if (verifyPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(newPassword, salt);
        result.password = hashedPwd;
        await result.save();
        res.status(200).json(result);
      } else {
        res.status(400).json({ msg: ["Incorrect current password."] });
      }
    })
    .catch((error: any) => {
      res.status(500).json({ msg: [error.message] });
    });
});

export { router as profileRouter };
