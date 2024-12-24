import { Request, Response, Router } from "express";
import { Application } from "@/models/applicationModel";
import GrantService from "@/services/grantService";
import { Comment } from "@/models/commentModel";
import { isEmpty } from "@/utils/isEmpty";
import grantService from "@/services/grantService";
import { uploadReview } from "@/middleware/multer";
import { io } from "@/index";

const router = Router();

router.post("/approve/:id", (req: any, res: Response) => {
  // Announcement.findOneAndUpdate({_id: req.params.id}, {$set: {[req.tokenUser.role]: true}})
  GrantService.handleRequest(req.params.id, req.tokenUser.role, true)
    .then((response) => {
      if (!isEmpty(response)) {
        io.emit('update_request')
        res.status(200).send(response);
        return;
      }
      throw new Error("Could not find the request.");
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.post("/sign/:id", (req: any, res: Response) => {
  // Announcement.findOneAndUpdate({_id: req.params.id}, {$set: {[req.tokenUser.role]: true}})
  Application.findByIdAndUpdate(req.params.id, {$set: {assigned: req.body.sign}})
  .then((response) => {
      if (!isEmpty(response)) {
        io.emit('update_request')
        res.status(200).send(response);
        return;
      }
      throw new Error("Couldn't find such request.");
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
        io.emit('update_request')
        res.status(200).send(response);
        return;
      }
      throw new Error("Could not find the request.");
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

export { router as requestProcessRouter };
