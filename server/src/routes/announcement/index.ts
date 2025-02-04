import { upload } from "@/middleware/multer";
import { Announcement } from "@/models/announcementModel";
import { Request, Response, Router } from "express";
import { isEmpty } from '@/utils/isEmpty';

const router = Router();

router.get("/", (req: any, res: Response) => {

  Announcement.find().then((announcements) => {
    if (isEmpty(announcements)) {
      res.status(200).json([]);
    } else {
      res.status(200).json(announcements);
    }
  }).catch((error) => {
    res.status(500).json({ msg: [error.message] });
  });
});

router.get("/:id", (req: any, res: Response) => {

  Announcement.findById(req.params.id).then((announcements) => {
    if (isEmpty(announcements)) {
      res.status(404).json({ msg: ["No announcements"] });
    } else {
      res.status(200).json(announcements);
    }
  }).catch((error) => {
    res.status(500).json({ msg: [error.message] });
  });
});

router.post("/", upload.single('image'), async (req: any, res: Response) => {
  if(req.tokenUser.role !== "grant_dir") {
    res.status(403).json({ msg: ["You do not have autherization for this route."] })
    return
  }

  const data = JSON.parse(req.body.data);
  console.log('announcement: ', data)
  const newAnnouncement = new Announcement(data);
  if(req.file) newAnnouncement.imageUrl = 'images/' + req.file.filename;

  try {
    const result = await newAnnouncement.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ msg: [error] });
  }
})

router.put("/:id", async (req: any, res: Response) => {
  if(req.tokenUser.role!== "grant_dir") {
    res.status(403).json({ msg: ["You do not have autherization for this route."] })
    return
  }
  const id = req.params.id;
  const data = req.body;
  
})

export { router as announcementRouter };
