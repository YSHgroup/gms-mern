import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { getCurrentUser } from "./authService";

export const requestGrant = (application: File, id: string) => {
  const user = getCurrentUser();
  const formData = new FormData();
  console.log('id: ', id)
  formData.append("announcement", id)
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

export const postComment = (id: string, content: string) => {
  axios.post("api/grant-application/comment/" + id, {content})
  .then(response => {
    toast.success("Comment submited")
  })
  .catch(err => {
    if(isAxiosError(err)) {
      err.response?.data.msg.map((error: string) => {
        toast.error(error)
      })
    }
  });
}

// export const getComments = () => {
//   const user = getCurrentUser();
//   return axios.get("api/grant-application/comment/get" ).then((response) => {
//     console.log("response: ", response)
//   })
// };