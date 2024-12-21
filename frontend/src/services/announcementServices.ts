import { Announcement } from "@/types/announcement";
import axios from "axios";

export const publishAnnouncement = (data: Announcement, img?: File) => {
	const formData = new FormData();

	formData.append("data", JSON.stringify(data));
	!!img && formData.append("image", img);

	return axios
		.post("/api/announcement", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		
};

export const getAnnouncements = () => axios.get("/api/announcement");
export const getAnnouncementById = (id: string) => axios.get("/api/announcement/" + id);
