import axios from "axios";
import { useState } from "react";
import UserListItem from "./UserListItem";
import { Box, Typography } from "@mui/material";

interface userModalProps {
  userModalType: string;
  userId: string;
}

const UserModal = ({ userModalType, userId }: userModalProps) => {
  const [userData, setUserData] = useState([]);
  if (userModalType === "following") {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/following`, {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
        params: {
          user_id: userId,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/follower`, {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
        params: {
          user_id: userId,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      {userData.length != 0 ? (
        userData.map((user) => (
          <UserListItem
            key={user["id"]}
            id={user["id"]}
            nickname={user["nickname"]}
            profile_image={user["profile_image"]}
          />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6">아직 친구가 없어요</Typography>
        </Box>
      )}
    </>
  );
};

export default UserModal;
