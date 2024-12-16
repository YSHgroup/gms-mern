import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { getCurrentUser } from "./authService";

export const getPendingUser = async () => {

  const user = getCurrentUser()

  try {
    const res = await axios.get(`api/pending-user/${user.email}`);
    const pendingUser = res.data.map((user: any) => ({
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        department: user.department,
        role: user.role,
        allowed: user.allowed,
        rejected: user.rejected
      }));
    return { pendingUser };
  } catch (err) {
    console.log("get error: ", err);
    return { error: [err] };
  }
};

export const allowPendingUsers = async (ids: string[], dispatch: any) => {
  try {
    await axios.put("api/pending-user/multi-user",  ids );
    toast.success('The selected users are allowed');
    dispatch()
  } catch (error) {
    if (isAxiosError(error))
      error.response?.data.msg.map((str: string) => {
        toast.error(str);
      });
  }
};

export const rejectPendingUsers = async (ids: string[], dispatch: any) => {
  try {
    await axios.patch("api/pending-user/multi-user", ids);
    toast.success('The selected users are rejected');
    dispatch()
  } catch (error) {
    if (isAxiosError(error))
      error.response?.data.msg.map((str: string) => {
        toast.error(str);
      });
  }
};

export const allowPendingUser = async (id: string) => {
    try {
      await axios.put("api/pending-user/user/" + id);
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
    const res = await axios.patch("api/pending-user/user/" + id);
    toast.success(res.data.msg);
  } catch (error) {
    if (isAxiosError(error))
      error.response?.data.msg.map((str: string) => {
        toast.error(str);
      });
  }
};

export const fetchUserInfo = () => {
  const user = getCurrentUser();
  return axios.get(`api/user/${user.email}`);
}

export const updateProfile = async (data: any) => {
  const user = getCurrentUser();
  try {
    await axios.put(`api/user/${user.email}`, data);
    toast.success('Profile updated successfully.');
  } catch (error) {
    if (isAxiosError(error))
      error.response?.data.msg.map((str: string) => {
        toast.error(str);
      });
  }
}

export const changePassword  = async (passwords: any) => {
  const user = getCurrentUser();
  try {
    await axios.put(`api/user/password/${user.email}`, passwords);
    toast.success('Password changed.');
  } catch (error) {
    if (isAxiosError(error))
      error.response?.data.msg.map((str: string) => {
        toast.error(str);
      });
  }
}