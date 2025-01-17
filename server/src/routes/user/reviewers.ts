import { User } from "@/models/userModel";
import { confirmUserByEmail } from "@/utils/confirmUserByEmail";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: any, res: Response) => {
  confirmUserByEmail(req.tokenUser.email)
    .then((confirmedResult) => {
      if (!confirmedResult.confirmed)
        throw new Error("Your email is not available.");
      const department = confirmedResult.user?.department;

      User.find({ department, role: "reviewer" })
        .then((reviewers) => {
          res.status(200).json(reviewers);
        })
        .catch((error) => {
          res.status(500).json({ msg: [error.message] });
        });
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

export { router as reviewerRouter}