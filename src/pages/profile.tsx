import { Box, Button, Skeleton, Typography, useMediaQuery } from "@mui/material";
import UserTab from "../components/profile/tab/UserTab";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Bio from "../components/profile/userinfo/Bio";
import EditModal from "../components/profile/modals/EditModal";
import ProfileImage from '../components/profile/userinfo/ProfileImage';
import Counter from "../components/profile/userinfo/Counter";

function ProfilePage() {

  const mobileScreenFontSize = useMediaQuery('(max-width: 1210px)');

  const statusButtonStyle = { 
    fontSize: mobileScreenFontSize ? "65%" : "100%", 
    backgroundColor: "#FFA41B", 
    color: "black",
    height: "28px"
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
    axios.post('http://localhost:8000/api/follow', {
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
      axios.delete('http://localhost:8000/api/follow', {
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
      .get(`http://localhost:8000/api/user`, {
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
  }, []);

  // Effect hook for get follow info
  useEffect(() => {
    const userId = window.localStorage.getItem('id');
    axios.get('http://localhost:8000/api/following', {
        headers : {
          Authorization : window.localStorage.getItem('access_token')
        },
      params : {
        user_id : userId
      }
    })
    .then(response => {
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
  },[]);




  
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
        <Box sx={{marginTop : "64px", height: "357px", boxShadow: "5"}}>
          <Box sx={{padding: "5px", height: "250px", display: "flex",justifyContent : "center", alignItems:"center"}}>
            <Box sx={{position: "relative", width: "100%", paddingTop: "15%", flexBasis: "15%", height: "0"}}>
              <ProfileImage src={import.meta.env.VITE_REACT_APP_PROFILE_IMAGE_PATH} alt="ProfileImage" />
            </Box>

            <Box sx={{display:"flex", flexDirection:"column", justifyContent: "center", flexBasis: "60%", pl: "4%"}}>
              <Box sx={{display:"flex", flexDirection:"row", justifyContent: "start"}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", my: "8px"}}>
                  {userData.nickname ? 
                  <Typography sx={{ fontSize : mobileScreenFontSize ? "90%" : 'none', mr: "10px"}} component="span" variant="h5">{userData.nickname}</Typography> : 
                  <Skeleton sx={{mr: "10px"}} variant="rounded" width={56} height={32} />
                  }
                  {
                    userData.id == window.localStorage.getItem('id') ? 
                    <Button onClick={openModal} variant="contained" size="small" sx={statusButtonStyle}>
                      編集
                    </Button> 
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
                <Bio children={userData.bio}/> 
              </Box>
              <Box sx={{ display: "flex", my: "5px", justifyContent: "start"}}>
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
