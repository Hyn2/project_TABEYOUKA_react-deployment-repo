import { Box } from "@mui/material";
import ProfileImage from "./ProfileImage";
import Counter from "./Counter";
import Bio from "./Bio";
import Name from "./Name";
import axios from "axios";
import { useEffect, useState } from "react";


const UserInfo = () => {
  const [userData, setUserData] = useState({ id: '', nickname: '', profile_image: '', bio: '',follower: 0, following: 0 });

  useEffect(() => {
    // 현재 유저의 정보
    axios.get('http://localhost:8000/api/user?id=justin010129@gmail.com')
      .then(response => {
        setUserData({
          id: response.data.id,
          nickname: response.data.nickname,
          profile_image:response.data.profile_image,
          bio:response.data.bio,
          follower: response.data.follower,
          following: response.data.following,
        })
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <Box sx={{height: "230px", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
    <Box sx={{height:"150px", width: "150px"}}>
      <ProfileImage src={userData.profile_image} alt="Hyun"/>
    </Box>
    <Box sx={{ paddingTop: "0.2%",width: "39%", display: "flex", flexDirection: "column"}}>
      <Name>{userData.nickname}</Name>
      <Box sx={{display: "flex", my: "7px"}}>
        <Counter counterType="follower" title="ポスト" count={123}/>
        <Counter counterType="follower" title="ファロワー" count={userData.follower}/>
        <Counter counterType="following" title="ファロー中" count={userData.following}/>
      </Box>
      <Bio>{userData.bio}</Bio>
    </Box>
  </Box>
  );
}

export default UserInfo;