import { Avatar, Box, Skeleton } from "@mui/material";
import Bio from "./Bio";
import Name from "./Name";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditModal from "../modals/EditModal";
import React from "react";

interface userInfoProps {
  userId: string;
}

const UserInfo = ({ userId }: userInfoProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    nickname: "",
    profile_image: "",
    bio: "",
  });
  const [modalState, setModalState] = useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  useEffect(() => {
    // 현재 유저의 정보
    axios
      .get(`http://localhost:8000/api/user`, {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
        params: {
          user_id: userId,
        },
      })
      .then((response) => {
        setUserData({
          id: response.data.id,
          nickname: response.data.nickname,
          profile_image: response.data.profile_image,
          bio: response.data.bio,
        });
      })
      .catch((error) => {
        console.error(error);
        window.localStorage.removeItem("refresh_token");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("id");
        if (error.response.status == 401) {
          navigate("/unauthorized");
        }
        // 추가적인 에러 처리?
      });
  }, [userId, modalState]);
  return (
    <Box
      sx={{
        height: "230px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ height: "150px", width: "150px" }}>
        {userData.profile_image ? (
          <Avatar
            alt={"profile_image"}
            src={userData.profile_image}
            sx={{
              width: "100%",
              height: "100%",
              border: "0.8px solid black",
            }}
          />
        ) : (
          <Skeleton variant="circular" width={150} height={150} />
        )}
      </Box>
      <Box
        sx={{
          paddingTop: "0.2%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Name
          name={userData.nickname}
          openEditModal={openModal}
          userId={userId}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Bio>{userData.bio}</Bio>
        </Box>
      </Box>
      <EditModal userId={userId} open={modalState} onClose={closeModal} />
    </Box>
  );
};

export default UserInfo;
