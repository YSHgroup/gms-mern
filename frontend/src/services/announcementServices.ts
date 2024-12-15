import { Announcement } from "@/types/announcement";
import axios from "axios";


export const publishAnnouncement = (data: Announcement, img?: File) => {
    const formData = new FormData();
    
    formData.append('data', JSON.stringify(data))
    !!img && formData.append('image', img);

    axios.post('/api/announcement', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => console.log(res)).catch(err => console.log(err));
}

export const getAnnouncements = () => axios.get('/api/announcement');