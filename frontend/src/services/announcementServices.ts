import { Announcement } from "@/types/announcement";
import axios from "axios";
import { toast } from "react-toastify";


export const publishAnnouncement = (data: Announcement, img?: File) => {
    const formData = new FormData();
    
    formData.append('data', JSON.stringify(data))
    !!img && formData.append('image', img);

    axios.post('/api/announcement', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        toast.success('Announcement published')
    }).catch(err => console.log(err));
}

export const getAnnouncements = () => axios.get('/api/announcement');