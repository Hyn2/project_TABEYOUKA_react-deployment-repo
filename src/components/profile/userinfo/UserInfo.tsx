import { Box, useMediaQuery } from "@mui/material";
import ProfileImage from "./ProfileImage";
import Bio from "./Bio";
import Name from "./Name";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface userInfoProps {
  userId : string,
}

const UserInfo = ({userId} : userInfoProps) => {
  const navigate = useNavigate();
  const mobileScreenJustifyContent = useMediaQuery('(max-width : 1500px)');
  const [userData, setUserData] = useState({ 
    id: '', 
    nickname: '', 
    profile_image: '', 
    bio: '' });

  useEffect(() => {
    // 현재 유저의 정보
    axios.get(`http://localhost:8000/api/user`, {
      params : {
        access_token : window.localStorage.getItem('access_token'),
        user_id : userId,
      }
    })
      .then(response => {
        setUserData({
          id: response.data.id,
          nickname: response.data.nickname,
          profile_image:response.data.profile_image,
          bio:response.data.bio,
        })
      })
      .catch(error => {
        console.error(error);
        window.localStorage.removeItem('refresh_token');
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id');
        if(error.response.status == 401) {
          navigate('/unauthorized');
        } else {
          window.alert('올바르지 않은 접근');
          return navigate('/');
        }
      });
  }, [userId]);
  return (
    <Box sx={{height: "230px", display: "flex", flexDirection: "row", alignItems : "center", justifyContent: "space-around"}}>
    <Box sx={{height:"150px", width: "150px"}}>
      <ProfileImage src={userData.profile_image} alt="Hyun"/>
    </Box>
    <Box sx={{ paddingTop: "0.2%", width: "50%", display: "flex", flexDirection: "column"}}>
      <Name userId={userId}>
        {userData.nickname}
      </Name>
      <Box sx={{display: "flex", justifyContent: mobileScreenJustifyContent ? "center" : "left",}}>
        <Bio>{userData.bio}</Bio>
      </Box>
    </Box>
  </Box>
  );
}

export default UserInfo;