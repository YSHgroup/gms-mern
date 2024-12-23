import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { getCurrentUser } from "./authService";

export const requestGrant = (application: File, id: string, budget: number, milestone: number, currencyType: string) => {
  const user = getCurrentUser();
  const formData = new FormData();
  formData.append("application", application);
  const data = {
    announcement: id,
    budget,
    milestone,
    currencyType
  }
  formData.append("data", JSON.stringify(data));

  return axios
    .post("api/grant-application/" + user.email, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
};

export const getRequests = () => {
  const user = getCurrentUser();
  return axios.get("api/grant-application/" + user.email);
};

export const approveRequest = (id: string) => {
  return axios.post("api/grant-application/approve/" + id);
};
export const signApplication = (id: string, sign: string, refetchRequest: Function) => {
  axios.post("api/grant-application/sign/" + id, {sign}).then(res => {
    toast.success(`${sign === 'approved'? 'Signed': 'Deny'} this application.`)
    refetchRequest()
  })
};

export const rejectRequest = (id: string) => {
  return axios.post("api/grant-application/reject/" + id);
};

export const postComment = (id: string, content: string, file?: File | null) => {
  const formdata = new FormData()
  formdata.append('content', JSON.stringify(content))
  if(file) formdata.append('reivew', file)

  axios.post("api/grant-application/comment/" + id, formdata, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
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