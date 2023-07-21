import axios from "axios";
import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import { Box, Typography } from "@mui/material";

interface userModalProps {
  userModalType: string,
  userId : string
}

const UserModal = ({userModalType, userId} : userModalProps) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if(userModalType === "following") {
      axios.get('http://localhost:8000/api/following', {
        params : {
          idToken : window.localStorage.getItem('id_token'),
          id : userId,
        }
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      axios.get('http://localhost:8000/api/follower', {
        params : {
          idToken : window.localStorage.getItem('id_token'),
          id : userId,
        }
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []);
  
  return (
    <>
      {userData.length == 0 ? (
        <Box sx={{display: "flex", textAlign: "center", justifyContent: "center", flexDirection: "column"}}>
          <Typography variant="h6">아직 친구가 없어요</Typography>
        </Box> 
        ) : (
        userData.map((user) => (
        <UserListItem nickname={user['nickname']} profile_image={user['profile_image']}/>
        ))
      )}
    </>
  )

}

export default UserModal;