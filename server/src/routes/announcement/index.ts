import { Announcement } from "@/models/announcementModel";
import { queryByRoleWritter } from "@/utils/roleAprpovalQuery";
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: any, res: Response) => {

  const user = await Announcement.find().then((announcements) => {
    if (!announcements) {
      res.status(404).json({ msg: ["No announcements"] });
    } else {
      res.status(200).json(announcements);
    }
  }).catch((error) => {
    res.status(500).json({ msg: [error.message] });
  });
});

router.post("/", async (req: any, res: Response) => {
  if(req.tokenUser.role !== "super_admin") {
    res.status(403).json({ msg: ["You do not have autherization for this route."] })
    return
  }

  const data = req.body;
  const newAnnouncement = new Announcement(data);

  try {
    const result = await newAnnouncement.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ msg: [error] });
  }
})

router.put("/:id", async (req: any, res: Response) => {
  if(req.tokenUser.role!== "super_admin") {
    res.status(403).json({ msg: ["You do not have autherization for this route."] })
    return
  }
  const id = req.params.id;
  const data = req.body;
  
})



export { router as announcementRouter };
