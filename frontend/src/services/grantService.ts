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
export const rejectRequest = (id: string) => {
  return axios.post("api/grant-application/reject/" + id);
};

export const signApplication = (id: string, data: Record<string, any>, refetchRequest: Function) => {
  axios.post("api/grant-application/assign/" + id, data).then(res => {
    toast.success(`${data.assign === 'approved'? 'Assigned': 'Denied'} this application.`)
    refetchRequest()
  })
};

export const askMoreInfo = (id: string, status: boolean, refetchRequest: Function) => {
  axios.put("api/grant-application/more-info/" + id, {status}).then(res => {
    toast.success("Asked more information for the applicant")
    refetchRequest()
  })
}

export const submitAdditionalDoc = (id: string, doc: File) => {
	const formData = new FormData();
	formData.append("document", doc);

	return axios
		.post("/api/grant-application/add-doc/" + id, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		
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