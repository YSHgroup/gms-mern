import { Announcement } from "@/types/announcement";
import axios from "axios";


export const publishAnnouncement = (data: Announcement, img?: File) => {
    const formData = new FormData();
    !!img && formData.append('image', img);
    axios.post('/api/announcement', {...data, formData }).then(res => console.log(res)).catch(err => console.log(err));
}