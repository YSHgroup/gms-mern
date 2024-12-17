import express from "express";
import { upload, uploadApplication } from "@/middleware/multer";
import { Announcement } from "@/models/announcementModel";
import { queryByRoleWritter } from "@/utils/roleAprpovalQuery";
import { Request, Response, Router } from "express";
import path from "path";
import { Application } from "@/models/applicationModel";
import { confirmUserByEmail } from "@/utils/confirmUserByEmail";
import GrantService from "@/services/grantService";
import { sendEmail } from "@/services/autoMailService";

const router = Router();

router.post("/approve/:id", (req: any, res: Response) => {

    // Announcement.findOneAndUpdate({_id: req.params.id}, {$set: {[req.tokenUser.role]: true}})
    GrantService.handleRequest(req.params.id, req.tokenUser.role, true)
    .then((response) => {
        if(!!response) {
            console.log('----', response)
            res.status(200).send(response)
        }
        throw new Error("Could not find your role.")
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

router.post("/reject/:id", (req: any, res: Response) => {
    // Announcement.findOneAndUpdate({_id: req.params.id}, {$set: {[req.tokenUser.role]: false}})
    GrantService.handleRequest(req.params.id, req.tokenUser.role, false)
    .then((response) => {
        if(!!response) {
            res.status(200).send(response)            
        }
        throw new Error("Could not find your role.")
    })
    .catch((error) => {
      res.status(500).json({ msg: [error.message] });
    });
});

export { router as requestProcessRouter };
