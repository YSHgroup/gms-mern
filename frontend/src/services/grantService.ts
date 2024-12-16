import axios from "axios";
import { toast } from "react-toastify";
import { getCurrentUser } from "./authService";

export const requestGrant = (application: File) => {
  const user = getCurrentUser();
  const formData = new FormData();
  formData.append("application", application);
  axios
    .post("api/grant-application/" + user.email, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      toast.success("Application submitted");
    })
    .catch((err) => toast.error(err.message));
};

export const getRequests = () => {
  const user = getCurrentUser();
  return axios.get("api/grant-application/" + user.email);
};

export const approveRequest = (id: string) => {
  return axios.post("api/grant-application/approve/" + id);
};

export const rejectRequest = (id: string) => {
  return axios.post("api/grant-application/reject/" + id);
};
