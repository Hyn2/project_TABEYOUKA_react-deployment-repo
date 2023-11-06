import { Box, Button, Skeleton, Typography, useMediaQuery } from "@mui/material";
import UserTab from "../components/profile/tabs/UserTab";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../components/profile/modals/EditModal";
import ProfileImage from '../components/profile/information/ProfileImage';
import Counter from "../components/profile/information/Counter";
import Defaultbutton from "../components/common/button/DefaultButton";

function ProfilePage() {

  const statusButtonStyle = { 
    fontSize: "0.85vw",
    backgroundColor: "#FFA41B", 
    color: "black",
    height: "28px",
    width : "5vw",
    border : "none",
    borderRadius : "3px",
    boxShadow : "2.75px 1.5px 5px rgba(0,0,0,0.3)"
  }

  const [following, setFollowing] = useState(false);
  const [followAndReview, setFollowAndReview] = useState({
    reviews : 0,
    followers : 0,
    followings : 0,
  });
  
  const queryString = window.location.search;
  const mobileScreen = useMediaQuery("(max-width: 800px)");
  const url = new URLSearchParams(queryString);
  const [userData, setUserData] = useState({
    id: url.get('user_id'),
    nickname: "",
    profile_image: "",
    bio: "",
  });

  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  const addFollow = (event : React.MouseEvent<HTMLButtonElement>) => {
    const followId = event.currentTarget.id;
    axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/follow`, {
      id : window.localStorage.getItem('id'),
      follow_id : followId,
    })
    .then(()=>{
      setFollowing(true);
    })
  }

  const deleteFollow = (event : React.MouseEvent<HTMLButtonElement>) => {
    const followId = event.currentTarget.id;
    if(window.confirm('취소하시겠습니까?')) {
      axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/follow`, {
        params : {
          id : window.localStorage.getItem('id'),
          follow_id : followId,
        }
      })
      .then(() => {
        setFollowing(false);
      })
    }
  }

  // Effect hook for get user data
  useEffect(() => {
    if(!window.localStorage.getItem('access_token')) {
      navigate('/login');
    }
    // 현재 유저의 정보
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/user`, {
        headers: {
          Authorization: window.localStorage.getItem("access_token"),
        },
        params: {
          user_id: userData.id
        },
      })
      .then((response) => {
        const {id, nickname, profile_image, bio} = response.data;
        setUserData({id, nickname, profile_image, bio});
        console.log('get')
        setFollowAndReview({
          reviews : response.data.reviews,
          followers : response.data.follower,
          followings : response.data.following,
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
      });      
      const userId = window.localStorage.getItem('id');
      axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/following`, {
          headers : {
            Authorization : window.localStorage.getItem('access_token')
          },
        params : {
          user_id : userId
        }
      })
      .then(response => {
        console.log('get review');
        const follower = response.data;
        const followerId : string[] = [];
        follower.forEach((element: any) => {
          followerId.push(element.id);
        });
        followerId.includes(userId||"justin010129@gmail.com") ?
        setFollowing(true) : 
        setFollowing(false);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  return (
    // 개인정보 높이 반응형 처리
    <Box
    sx={{
      // display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    }}>
      <EditModal userId={userData.id||'justin010129@gmail.com'} open={modalState} onClose={closeModal} />
      <Box
        sx={{
          flexBasis: mobileScreen ? "100%" : "70%",
          width: "100%",
          height: "100%",
        }}
        >
        <Box sx={{marginTop : "64px", height: "358px", boxShadow: "5"}}>
          <Box sx={{padding: "5px", height: "250px", display: "flex", justifyContent : "center", alignItems:"center"}}>
            <Box sx={{position: "relative", paddingTop: "10%", flexBasis: "10%", height: "0"}}>
              <ProfileImage src={import.meta.env.VITE_REACT_APP_PROFILE_IMAGE_PATH} alt="ProfileImage" />
            </Box>

            <Box sx={{display:"flex", flexDirection:"column", justifyContent: "center", flexBasis: "47%", pl: "4%"}}>
              <Box sx={{display:"flex", flexDirection:"row", justifyContent: "start"}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", my: "8px"}}>
                  {userData.nickname ? 
                  <Typography sx={{ fontSize : '1.7vw', mr: "10px"}} component="span" variant="h5">{userData.nickname}</Typography> : 
                  <Skeleton sx={{mr: "10px"}} variant="rounded" width={56} height={32} />
                  }
                  {
                    userData.id == window.localStorage.getItem('id') ?
                    <Defaultbutton onClick={openModal} width="60px" height = "30px" text="編集" />
                    : 
                    following ?           
                    <Button id={userData.id||"justin010129@gmail.com"} onClick={deleteFollow} variant="contained" size="small" sx={statusButtonStyle}>
                    ファロー中
                    </Button> :
                    <Button id={userData.id||"justin010129@gmail.com"} onClick={addFollow} variant="contained" size="small" sx={statusButtonStyle}>
                    ファローする
                    </Button>
                  }
                </Box>
              </Box>
              <Box>
              {userData.bio ? 
                  <Typography variant="caption" sx={{my: "7px", fontSize: "1vw"}}>{userData.bio}</Typography> : 
                  <Skeleton sx={{mr: "10px"}} variant="rounded" width={300} height={25} />
                  }
              </Box>
              <Box sx={{ display: "flex", my: "8px", justifyContent: "start"}}>
                <Counter userId={userData.id||''} counterType="reviews" title="ポスト" count={followAndReview.reviews}/>
                <Counter userId={userData.id||''} counterType="follower" title="ファロワー" count={followAndReview.followers}/>
                <Counter userId={userData.id||''} counterType="following" title="ファロー中" count={followAndReview.followings}/>
              </Box>
            </Box>
          </Box>
          <Box>
            <UserTab userId={userData.id||'justin010129@gmail.com'} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilePage;
