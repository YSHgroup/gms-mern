import { DashboardContent } from "@/layouts/dashboard";
import { fetchUserInfo } from "@/services/userService";
import { User } from "@/types/userInfo";
import { Typography, Grid2 as Grid, Container } from "@mui/material";
import React from "react";
import UserProfile from "./UserProfile";

const getUserInfo = (setUser: React.Dispatch<React.SetStateAction<any>>) => {
  fetchUserInfo().then(res => {
    if(res.status >= 300) {
      console.log('error fetching user info: ' + res.data);
    }
    if(res.data) {
      setUser(res.data);
    }
  }).catch(err =>{
    console.log('error fetching user info: ', err);
  })
}

export default function ProfileView() {
  const [user, setUser] = React.useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    department: ""
  })

  const handleChangeResult = () => {
    getUserInfo(setUser)
  }
 
  React.useEffect(() => {
    getUserInfo(setUser)
  },[])

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Profile
      </Typography>

      <Container className="bg-white border-solid border rounded border-stone-100 p-6">
        <UserProfile user={user} onChangeSuccess={handleChangeResult} ></UserProfile>  
      </Container>
    </DashboardContent>
  );
}
