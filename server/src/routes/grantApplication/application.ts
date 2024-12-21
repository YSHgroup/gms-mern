import { Response, Router } from "express";
import { uploadApplication } from "@/middleware/multer";
import { Application } from "@/models/applicationModel";
import { confirmUserByEmail } from "@/utils/confirmUserByEmail";
import { isEmpty } from "@/utils/isEmpty";

const router = Router();

router.get("/", (req: any, res: Response) => {
  Application.find()
    .then((application) => {
      if (isEmpty(application)) {
        res.status(404).json({ msg: ["No application"] });
      } else {
        res.status(200).json(application);
        console.log("Application: ", application);
      }
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.get("/:email", (req: any, res: Response) => {
  let query: any;
  confirmUserByEmail(req.params.email)
    .then((comfirmedResult) => {
      if (!comfirmedResult.confirmed)
        throw new Error("Your email is not available.");
      if (req.tokenUser.role === "user") {
        query = { email: req.params.email };
      } else if (req.tokenUser.role !== "grant_dir" && req.tokenUser.role !== "grant_dep" && req.tokenUser.role !== "finance" ) {
        query = { department: comfirmedResult.user?.department };
      }
      
      Application.find(query)
      .populate("comment")
      .populate("announcement")
      .then((application) => {
          if (isEmpty(application)) {
            res.status(404).json({ msg: ["No application"] });
          } else {
            res.status(200).json(application);
          }
        })
        .catch((error) => {
          res.status(500).json({ msg: [error.message] });
        });
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.post(
  "/:email",
  uploadApplication.single("application"),
  (req: any, res: Response) => {

    const { announcement, budget, milestone, currencyType } = JSON.parse(req.body.data)

    confirmUserByEmail(req.params.email)
      .then((response) => {
        if (response.confirmed) {
          const user = response.user;
          const data = {
            email: user?.email,
            enrollment: user?.enrollment,
            firstName: user?.firstName,
            lastName: user?.lastName,
            department: user?.department,
            application: req.file.filename,
            announcement,
            budget,
            milestone,
            currencyType
          };
          const newApplication = new Application(data);

          newApplication
            .save()
            .then(() => res.status(200).json({ msg: "Application saved" }))
            .catch((error) => res.status(500).json({ msg: [error.message] }));
        }
      })
      .catch((error) => {
        res.status(404).json({ msg: [error.message] });
      });
  }
);

export { router as applicationRouter };
