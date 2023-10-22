import { Box, Button, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Counter from "./Counter";

interface nameProps {
  userId : string,
  name : string,
  openEditModal : ()=>void,
}

interface Follower {
  id: string,
}

const Name = ({userId, name, openEditModal} : nameProps) => {

  const mobileScreenFlex = useMediaQuery('(max-width:1500px)');
  const mobileScreenFontSize = useMediaQuery('(max-width: 1210px)');

  const statusButtonStyle = {
    marginTop: "3px", 
    fontSize: mobileScreenFontSize ? "65%" : "100%", 
    backgroundColor: "black", 
    color: "white",
    height: "30px"
  }

  const [following, setFollowing] = useState(false);
  const [followAndReview, setFollowAndReview] = useState({
    reviews : 0,
    followers : 0,
    followings : 0,
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/following', {
      headers : {
        Authorization : window.localStorage.getItem('access_token')
      },
      params : {
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
    headers : {
      Authorization : window.localStorage.getItem('access_token')
    },  
      params : {
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
    <Box sx={{ display: "flex", alignItems: mobileScreenFlex ? "left" : "center", flexDirection: mobileScreenFlex ? "column" : "row"}}>
      {name ? 
      <Typography sx={{ fontSize : mobileScreenFontSize ? "90%" : 'none', mr: "10px"}} component="span" variant="h5">{name}</Typography> : 
      <Skeleton sx={{mr: "10px"}} variant="rounded" width={56} height={32} />
      }
  
      <Box sx={{ width: "50%"}}>
        {
          userId == window.localStorage.getItem('id') ? 
          <Button onClick={openEditModal} variant="contained" size="small" sx={statusButtonStyle}>
            編集
          </Button> 
           : 
           following ?           
           <Button id={userId} onClick={deleteFollow} variant="contained" size="small" sx={statusButtonStyle}>
           ファロー中  
           </Button> :
           <Button id={userId} onClick={addFollow} variant="contained" size="small" sx={statusButtonStyle}>
           ファローする
           </Button>
        }
      </Box>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "left", my: "7px"}}>
      <Counter userId={userId} counterType="reviews" title="ポスト" count={followAndReview.reviews}/>
      <Counter userId={userId} counterType="follower" title="ファロワー" count={followAndReview.followers}/>
      <Counter userId={userId} counterType="following" title="ファロー中" count={followAndReview.followings}/>
    </Box>
    </>  
  );
}

export default Name;
