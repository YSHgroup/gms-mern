import express from "express";
import { upload, uploadApplication } from "@/middleware/multer";
import { Announcement } from "@/models/announcementModel";
import { Request, Response, Router } from "express";
import { Application } from "@/models/applicationModel";
import GrantService from "@/services/grantService";
import { Comment } from "@/models/commentModel";
import { isEmpty } from "@/utils/isEmpty";
import grantService from "@/services/grantService";

const router = Router();

router.post("/approve/:id", (req: any, res: Response) => {
  // Announcement.findOneAndUpdate({_id: req.params.id}, {$set: {[req.tokenUser.role]: true}})
  GrantService.handleRequest(req.params.id, req.tokenUser.role, true)
    .then((response) => {
      if (!isEmpty(response)) {
        res.status(200).send(response);
        return;
      }
      throw new Error("Could not find your role.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.post("/sign/:id", (req: any, res: Response) => {
  // Announcement.findOneAndUpdate({_id: req.params.id}, {$set: {[req.tokenUser.role]: true}})
  console.log('signed: ', req.body)
  Application.findByIdAndUpdate(req.params.id, {$set: {signed: req.body.sign}})
  .then((response) => {
      if (!isEmpty(response)) {
        res.status(200).send(response);
        return;
      }
      throw new Error("Couldn't such data.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.post("/reject/:id", (req: any, res: Response) => {
  // Announcement.findOneAndUpdate({_id: req.params.id}, {$set: {[req.tokenUser.role]: false}})
  GrantService.handleRequest(req.params.id, req.tokenUser.role, false)
    .then((response) => {
      if (!isEmpty(response)) {
        res.status(200).send(response);
        return;
      }
      throw new Error("Could not find your role.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

// router.get("/comment/get", async (req: any, res: Response) => {
//     console.log('comment: --')

//     Comment.find().then((result) => {
//         if(result) {
//             console.log('comment: ', result)
//         }
//     }).catch((error) => {
//         res.status(500).json({ msg: [error.message] });
//     })
// })

router.post("/comment/:id", async (req: any, res: Response) => {
  const { content } = req.body;
  const role = req.tokenUser.role;
  try {
    if (role === "user" || role === "grant_dir")
      throw new Error("You don't have permission");
    const application = (await Application.findOne({
      _id: req.params.id,
    })) as any;
    if (isEmpty(application)) {
      throw new Error("Application not found");
    }
    // if (
    //   application[role] == "" ||
    //   (application.signed && role === "col_dean") ||
    //   (application.accepted && role === "col_dean")
    // ) {
    //   throw new Error("You have already approved this application");
    // }
    const confirmData = grantService.checkProcedure(0, role, application);
    // if (!confirmData.result) {
    //   throw new Error("Your previous step was not performed.");
    // }
    
    Comment.findOne({ _id: application.comment })
    .then((result) => {
      if (isEmpty(result)) {
          const comment = new Comment({ [req.tokenUser.role]: content });
          comment
            .save()
            .then((result) => {
              if (!isEmpty(result)) {
                Application.findOneAndUpdate(
                  { _id: req.params.id },
                  { $set: { comment: result._id } }
                )
                  .then((result) => {
                    res.status(200).send(result);
                  })
                  .catch((error) => {
                    throw new Error(error.message);
                  });
              }
            })
            .catch((error) => {
              throw new Error(error.message);
            });

        } else {
          
          Comment.findOneAndUpdate(
            { _id: application.comment },
            { $set: { [req.tokenUser.role]: content } }
          )
           .then((result) => {
              if (!isEmpty(result)) {
                res.status(200).send(result);
              }
            })
           .catch((error) => {
              throw new Error(error.message);
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ msg: [error.message] });
      });
  } catch (error) {
    res.status(500).json({ msg: ["Error saving data"] });
  }
});

export { router as requestProcessRouter };
