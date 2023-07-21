import { Box, useMediaQuery } from "@mui/material";
import ProfileImage from "./ProfileImage";
import Counter from "./Counter";
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
    bio: '',
    reviews: 0,
    follower: 0, 
    following: 0 });

  useEffect(() => {
    // 현재 유저의 정보
    axios.get(`http://localhost:8000/api/user`, {
      params : {
        idToken : window.localStorage.getItem('id_token'),
        user_id : userId,
      }
    })
      .then(response => {
        setUserData({
          id: response.data.id,
          nickname: response.data.nickname,
          profile_image:response.data.profile_image,
          bio:response.data.bio,
          reviews:response.data.reviews,
          follower: response.data.follower,
          following: response.data.following,
        })
      })
      .catch(error => {
        console.error(error);
        // if(error.response.status == 401) {
        //   navigate('/unauthorized');
        // } else {
        //   navigate('/');
        // }
      });
  }, []);
  return (
    <Box sx={{height: "230px", display: "flex", flexDirection: "row", alignItems : "center", justifyContent: "space-around"}}>
    <Box sx={{height:"150px", width: "150px"}}>
      <ProfileImage src={userData.profile_image} alt="Hyun"/>
    </Box>
    <Box sx={{ paddingTop: "0.2%", width: "50%", display: "flex", flexDirection: "column"}}>
      <Name userId={userId}>{userData.nickname}</Name>
      <Box sx={{ display: "flex", justifyContent: mobileScreenJustifyContent ? "center" : "left", my: "7px"}}>
        <Counter userId={userId} counterType="reviews" title="ポスト" count={userData.reviews}/>
        <Counter userId={userId} counterType="follower" title="ファロワー" count={userData.follower}/>
        <Counter userId={userId} counterType="following" title="ファロー中" count={userData.following}/>
      </Box>
      <Box sx={{display: "flex", justifyContent: mobileScreenJustifyContent ? "center" : "left",}}>
        <Bio>{userData.bio}</Bio>
      </Box>
    </Box>
  </Box>
  );
}

export default UserInfo;