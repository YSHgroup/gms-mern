import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { getCurrentUser } from "./authService";

export const getPendingUser = async () => {

  const user = JSON.parse(getCurrentUser())
  console.log(user);
  console.log('email:', JSON.parse(getCurrentUser()))

  try {
    const res = await axios.get(`api/pending-user/${user.email}`);
    const pendingUser = res.data.map((user: any) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        department: user.department,
        role: user.role,
      }));
    return { pendingUser };
  } catch (err) {
    console.log("get error: ", err);
    return { error: [err] };
  }
};

export const allowPendingUser = async (id: string) => {
    try {
      await axios.put("api/pending-user/" + id);
      toast.success('The operation was successful.');
    } catch (error) {
      if (isAxiosError(error))
        error.response?.data.msg.map((str: string) => {
          toast.error(str);
        });
    }
  };

export const rejectPendingUser = async (id: string) => {
  try {
    const res = await axios.delete("api/pending-user/" + id);
    toast.success(res.data.msg);
  } catch (error) {
    if (isAxiosError(error))
      error.response?.data.msg.map((str: string) => {
        toast.error(str);
      });
  }
};
