import { Request, Response, Router } from "express";
import { Application } from "@/models/applicationModel";
import GrantService from "@/services/grantService";
import { Comment } from "@/models/commentModel";
import { isEmpty } from "@/utils/isEmpty";
import { uploadAddDoc, uploadReview } from "@/middleware/multer";
import { io } from "@/index";

const router = Router();

router.post("/approve/:id", async (req: any, res: Response) => {
  const role = await applicationPropertyGetter(req.params.id, req.tokenUser.role, req.tokenUser.email)
  GrantService.handleRequest(req.params.id, role, true)
    .then((response) => {
      if (!isEmpty(response)) {
        io.emit('update_request')
        res.status(200).send(response);
        return;
      }
      throw new Error("Could not find the application.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.post("/assign/:id", (req: any, res: Response) => {
  console.log('assign: ', req.body)
  Application.findByIdAndUpdate(req.params.id, {$set: {assigned: req.body.assign}})
  .then((response) => {
      Application.findByIdAndUpdate(req.params.id, {$set: {'reviewer_1.user': req.body.reviewers[0], 'reviewer_2.user': req.body.reviewers[1]}}, {new: true})
        .then(() => {
          if (!isEmpty(response)) {
            io.emit('update_request')
            res.status(200).send(response);
            return;
          }
          throw new Error("Couldn't find such application.");
        })
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.post("/reject/:id", (req: any, res: Response) => {
  GrantService.handleRequest(req.params.id, req.tokenUser.role, false)
    .then((response) => {
      if (!isEmpty(response)) {
        io.emit('update_request')
        res.status(200).send(response);
        return;
      }
      throw new Error("Could not find the application.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

// Set comment router
router.post("/comment/:id", uploadReview.single('reivew'), async (req: any, res: Response) => {
  const content = JSON.parse(req.body.content);

  const role = req.tokenUser.role;
  try {
    if (role === "user")
      throw new Error("You don't have permission");
    const application = (await Application.findOne({
      _id: req.params.id,
    })) as any;
    if (isEmpty(application)) {
      throw new Error("Application not found");
    }
    
    Comment.findOne({ _id: application.comment })
    .then((result) => {
      if (isEmpty(result)) {
          const comment = new Comment({ [req.tokenUser.role]: {text: content, url: req.file.filename} });
          comment
            .save()
            .then((result) => {
              if (!isEmpty(result)) {
                Application.findOneAndUpdate(
                  { _id: req.params.id },
                  { $set: { comment: result._id } }
                )
                  .then((result) => {
                    io.emit('update_comment', result)
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
            { $set: { [req.tokenUser.role]: {text: content, url: req.file.filename} } }
          )
          .then((result) => {
              if (!isEmpty(result)) {
                io.emit('update_comment', result)
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
  } catch (error: any) {
    res.status(500).json({ msg: [error.message] });
  }
});

// all catch for more-info request
router.put("/more-info/:id", (req: any, res: Response) => {
  Application.findByIdAndUpdate(req.params.id, {$set: {askMoreInfo: req.body.status}})
  .then((response) => {
      if (!isEmpty(response)) {
        io.emit('update_request')
        res.status(200).send(response);
        return;
      }
      throw new Error("Couldn't find such application.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
  })
router.post("/add-doc/:id", uploadAddDoc.single('document'), (req: any, res: Response) => {
  Application.findByIdAndUpdate(req.params.id, {$set: {askMoreInfo: false}, $push: {additionalDoc: req.file.filename}})
  .then((response) => {
      if (!isEmpty(response)) {
        io.emit('update_request')
        res.status(200).send(response);
        return;
      }
      throw new Error("Couldn't find such application.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
  })

const applicationPropertyGetter = async (id: string, role: string, email: string) => {
  let gotRole;
  if(role == "reviewer") {
    const application = await Application.findById(id)
            .populate("reviewer_1.user")
            .populate("reviewer_2.user") as any

    gotRole = email === application?.reviewer_1?.user.email ? "reviewer_1" :
              email === application?.reviewer_2?.user.email ? "reviewer_2" :
              null;
  } else {
    gotRole = role
  }
  return gotRole
}

export { router as requestProcessRouter };
