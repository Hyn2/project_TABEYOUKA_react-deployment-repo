import { Box, Skeleton } from "@mui/material";
import Bio from "./Bio";
import Name from "./Name";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditModal from "../modals/EditModal";
import ProfileImage from "./ProfileImage";

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
        const {id, nickname, profile_image, bio} = response.data;
        setUserData({id, nickname, profile_image, bio});
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
          <ProfileImage src={userData.profile_image} alt="profile" />
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
