import { RegUser } from "@/types/userInfo";
import { isSuccessResult } from "@/utils/responseChecker";
import axios from "axios";
import { toast } from "react-toastify";

const register = (userData: RegUser, navigate: Function) => {
  axios
    .post("/api/auth/register", userData)
    .then((result) => {
      if(isSuccessResult(result.status)) 
        {
          toast.success(result.data.msg)
          navigate('/login')
        }
    })
    .catch((err) => {
      console.log("error occured: ", err)
      toast.error('Failed to login')
    });
};
const login = (email: string, password: string, navigate: Function) => {
  fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json()
    })
    .then((result) => {
      if(result.errorType) {
        result?.msg.map((msg: string) => toast.warn(msg), { autoClose: 5000 })
        return
      }

      navigate('/')
      result.user && localStorage.setItem("user", JSON.stringify(result.user));
      result.token && localStorage.setItem("token", result.token);
      result.refresh && localStorage.setItem("refresh", result.refresh);
    })
    .catch((err) => {
      console.log("error occured: ", err)
    });
};

const refresh = async () => {
  const refreshToken = localStorage.getItem("refresh");
  const response = await axios.post("/api/auth/refresh-token", {
    token: refreshToken,
  });
  response.data && localStorage.setItem("token", JSON.stringify(response.data));
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user")
  const token = localStorage.getItem('token')
  if(!token || !user) return {}
  const {role} = JSON.parse(atob(token.split('.')[1]))

  return {...JSON.parse(user), role}
};

const logout = async (navigate: Function) => {
  // const refreshToken = localStorage.getItem("refresh");
  // await axios.post("/api/auth/logout", { token: refreshToken });
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  navigate('/login')
};

export { register, login, refresh, getCurrentUser, logout };
