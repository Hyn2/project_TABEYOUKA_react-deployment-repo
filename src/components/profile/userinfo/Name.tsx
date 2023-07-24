import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import EditModal from "../modals/EditModal";
import { useEffect, useState } from "react";
import axios from "axios";
import Counter from "./Counter";
import { useNavigate } from "react-router-dom";

interface nameProps {
  userId : string,
  children : React.ReactNode,
}

interface Follower {
  id: string,
}

const Name = ({userId, children} : nameProps) => {

  const [modalState, setModalState] = useState(false);
  const [following, setFollowing] = useState(false);
  const navigate = useNavigate();
  const [followAndReview, setFollowAndReview] = useState({
    reviews : 0,
    followers : 0,
    followings : 0,
  });

  const openModal =() => setModalState(true);
  const closeModal = () => setModalState(false);
  const mobileScreenFlex = useMediaQuery('(max-width:1500px)');
  const mobileScreenFontSize = useMediaQuery('(max-width: 1210px)');

  useEffect(() => {
    axios.get('http://localhost:8000/api/following', {
      params : {
        access_token : localStorage.getItem('access_token'),
        user_id : userId,
      }
    })
    .then(response => {
      const follower : Follower[] = response.data;
      const followerId : string[] = [];
      follower.forEach((element) => {
        followerId.push(element.id);
      });
      followerId.includes(userId) ? setFollowing(true) : 
      setFollowing(false);
    })
    .catch(error => {
      console.error(error);
    })

    axios.get(`http://localhost:8000/api/user`, {
      params : {
        access_token : localStorage.getItem('access_token'),
        user_id : userId,
      }
    })
      .then(response => {
        setFollowAndReview({
          reviews : response.data.reviews,
          followers : response.data.follower,
          followings : response.data.following,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [following]);

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

  return (
    <>
    <Box sx={{ py:"11px", display: "flex", alignItems: "center", flexDirection: mobileScreenFlex ? "column" : "row"}}>
      <Typography sx={{paddingTop : "10px"}} component="span" variant="h5">{children}</Typography>
      <Box sx={{display : "flex", flexDirection : "row", width: "50%", justifyContent: "space-evenly"}}>
        {
          userId == window.localStorage.getItem('id') ? 
          <>
          <Button onClick={openModal} variant="contained" size="small" 
          sx={{ marginTop : "10px", fontSize: mobileScreenFontSize ? "65%" : "100%", 
                marginRight: "10px", backgroundColor: "black", color: "white"}}>
            編集
          </Button> 
          <EditModal userId={userId} open={modalState} onClose={closeModal} />
          </>
           : 
           following ?           
           <Button id={userId} onClick={deleteFollow} variant="contained" size="small" 
           sx={{ marginTop: "10px", fontSize: mobileScreenFontSize ? "65%" : "100%", 
                 backgroundColor: "black", color: "white"}}>
           ファロー中  
           </Button> :
           <Button id={userId} onClick={addFollow} variant="contained" size="small" 
           sx={{ marginTop: "10px", fontSize: mobileScreenFontSize ? "65%" : "100%", 
                 backgroundColor: "black", color: "white"}}>
           ファローする
           </Button>
        }
      </Box>
    </Box>
    <Box sx={{ display: "flex", justifyContent: mobileScreenFlex ? "center" : "left", my: "7px"}}>
      <Counter userId={userId} counterType="reviews" title="ポスト" count={followAndReview.reviews}/>
      <Counter userId={userId} counterType="follower" title="ファロワー" count={followAndReview.followers}/>
      <Counter userId={userId} counterType="following" title="ファロー中" count={followAndReview.followings}/>
    </Box>
    </>  
  );
}

export default Name;
