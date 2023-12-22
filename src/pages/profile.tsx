import {Box, Button, Card, CardContent, Grid, Skeleton, Tab, Tabs, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EditModal from "../components/profile/modals/EditModal";
import ProfileImage from '../components/profile/information/ProfileImage';
import Counter from "../components/profile/information/Counter";
import MyButton from "../components/common/button/ProfileButton";
import TabPanel from "../components/profile/tabs/TabPanel.tsx";
import ReviewContainer from "../components/profile/reviewtab/ReviewContainer.tsx";
import UserMap from "../components/profile/map/UserMap.tsx";
import Categories from "../components/profile/category/Categories.tsx";

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
  const queryString = window.location.search;
  const url = new URLSearchParams(queryString);
  const navigate = useNavigate();

  const [following, setFollowing] = useState(false);
  const [followAndReview, setFollowAndReview] = useState({
    reviews : 0,
    followers : 0,
    followings : 0,
  });
  const [userData, setUserData] = useState({
    id: url.get('user_id'),
    nickname: "",
    profile_image: "",
    bio: "",
  });
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

  const destroyAccount = () => {
    axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/user`,{
      params : {
        id : window.localStorage.getItem('id'), 
      }
    })
    .then((response) => {
      console.log(response);
      window.localStorage.clear;
      alert('회원탈퇴가 완료되었습니다.');
      navigate('/');
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

  const [tab, setTab] = useState(1);

  const selectTab = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
  }

  return (
      <Box >
        <EditModal userId={userData.id||'justin010129@gmail.com'} open={modalState} onClose={closeModal} />
        <Grid  container sx={{ justifyContent: "center", marginTop: "3%"}}>
          <Grid item xs={4}>
            <Card sx={{justifyContent: "center"}}>
              <CardContent>
                <Box sx={{position: "relative", paddingTop: "35%", width: "35%", height: "0"}}>
                  <ProfileImage src={userData.profile_image} alt="ProfileImage" />
                </Box>
                {userData.nickname ?
                    <Typography sx={{ display: "block", fontSize : "1.1vw"}} component="span" variant="h5">{userData.nickname}</Typography> :
                    <Skeleton sx={{mr: "10px"}} variant="rounded" width={50} height={20} />
                }
                {userData.bio ?
                    <Typography variant="caption" sx={{my: "7px", fontSize: "0.8vw"}}>{userData.bio}</Typography> :
                    <Skeleton sx={{mr: "10px"}} variant="rounded" width={50} height={18} />
                }
                {userData.id == window.localStorage.getItem('id') ?
                    //   내 프로필 페이지일 경우
                    <>
                      <MyButton size={"small"} onClick={openModal} sx={{fontSize: "0.85vw", ":hover": {backgroundColor: "rgba(255, 164, 27, 1)", }, mx: "5px", backgroundColor: 'rgba(255, 164, 27, 0.85)', color: "black", borderRadius: "10%"}}>編集</MyButton>
                      <MyButton size={"small"} onClick={destroyAccount} sx={{fontSize: "0.85vw", ":hover": {backgroundColor: "rgba(221, 0, 0)", }, mx: "5px", backgroundColor: "rgba(221, 0, 0, 0.85)", color: "black", borderRadius: "10%"}}> アカウント削除 </MyButton>
                    </>
                    :
                    following ?
                        <Button id={userData.id||"justin010129@gmail.com"} onClick={deleteFollow} variant="contained" size="small" sx={statusButtonStyle}>
                          ファロー中
                        </Button> :
                        <Button id={userData.id||"justin010129@gmail.com"} onClick={addFollow} variant="contained" size="small" sx={statusButtonStyle}>
                          ファローする
                        </Button>
                }
                <Box sx={{ display: "flex", my: "8px", justifyContent: "start"}}>
                  <Counter userId={userData.id||''} counterType="reviews" title="ポスト" count={followAndReview.reviews}/>
                  <Counter userId={userData.id||''} counterType="follower" title="ファロワー" count={followAndReview.followers}/>
                  <Counter userId={userData.id||''} counterType="following" title="ファロー中" count={followAndReview.followings}/>
                </Box>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={6}>
            <Tabs variant="fullWidth" value={tab} onChange={selectTab} aria-label="usertabs" sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "black",
                opacity: "0.4" // 선택된 Tab의 색상을 변경
              },
              paddingBottom: "0.05%"
            }}
            >
              <Tab label="Reviews" value={1} sx={{
                "&.Mui-selected": {
                  color: "black", // 선택된 탭의 글자 색 변경
                },
              }}/>
              <Tab label="Map" value={2} sx={{
                "&.Mui-selected": {
                  color: "black", // 선택된 탭의 글자 색 변경
                },
              }}/>
              <Tab label="My Logs" value={3} sx={{
                "&.Mui-selected": {
                  color: "black", // 선택된 탭의 글자 색 변경
                },
              }}/>
            </Tabs>

            <TabPanel value={tab} index={1}><ReviewContainer userId={userData.id||""} /></TabPanel>
            <TabPanel value={tab} index={2}>
              <UserMap userId={userData.id||""} />
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Categories id={userData.id||""} />
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
  );
}

export default ProfilePage;
