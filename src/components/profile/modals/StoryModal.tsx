import {Avatar, Box, ButtonBase, Modal, Skeleton, Typography, useMediaQuery} from "@mui/material"
import {ArrowBackIos, LocationOn, ArrowForwardIos, MoreHoriz, Close} from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryEditModal from "./StoryEditModal";
import {EditorOnlyRead} from "../../common/CKEditor.tsx";
import ProfileButton from "../../common/button/ProfileButton";

interface modalProps {
  id : number,
  open : boolean,
  onClose : () => void,
  image : string,
  storyName : string,
}

const StoryModal = ({id, open, onClose, image, storyName} : modalProps) => {
  const [review, setReview] = useState([{
    content: '',
    created_at: '',
    id: 0,
    like: 0,
    restaurant_id: '',
    restaurant_name: '',
    review_images: [{
      image_url: '',
    }],
    score: 0,
    user_id: '',
  }]);
  const [indexCounter, setIndexCounter] = useState(0);
  const [storyEditModal, setStoryEditModal] = useState(false);
  const mobileScreen = useMediaQuery('(max-width: 500px)');

  useEffect(()=>{
    axios
    .get(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/storylist/${id}`,{
      headers : {
        Authorization : window.localStorage.getItem('access_token'),
      },
    } )
    .then(response => {
      console.log(response.data);
      setReview(response.data.reviews);
    })
    .catch(error => {
      console.error(error);
    });
  },[indexCounter, storyEditModal]);

  const onClickButton = (event : React.MouseEvent<HTMLButtonElement>) => {
    const dir = event.currentTarget.id;
    if(dir == 'back') {
      setIndexCounter(indexCounter-1);
    } else if(dir == 'forward') {
      setIndexCounter(indexCounter+1);
    }
  }

  const clickMoreButton = () => {
    setStoryEditModal(true);
  }

  const closeEditModal = () => {
    setStoryEditModal(false);
  }

  // 버튼을 누를 때 마다 인덱스 값이 증가하고, 배열의 요소를 새로 렌더링 함.
  return (
    <Modal open={open} onClose={onClose} sx={{ alignItems: "center", display: "flex", justifyContent : "center" }}>
      <Box sx={{display: "flex", flexBasis: "45%", justifyContent :"center"}}>
      <ProfileButton sx={{"&:hover" : {backgroundColor : "transparent", boxShadow: "none"}}} disabled={ indexCounter == 0} onClick={onClickButton} id="back" variant="contained" disableTouchRipple><ArrowBackIos /></ProfileButton>
        <Box sx={{
          display: "flex", flexDirection: "column", flexBasis: "80%",
          height: "80%", borderRadius: "1%", backgroundColor: "white", padding: "10px"
        }}>
          <ButtonBase onClick={onClose} sx={{right :"48%"}}>
            <Close /> 
          </ButtonBase>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar src={image} sx={{width: "50px", height: "50px" }} />
            <Box sx={{ flexBasis: "82%", display: "flex", flexDirection: "column", alignItems: "left" }}>
              <Typography sx={{ fontSize: "12px", py: "5px", marginLeft: "5px" }}>{storyName}</Typography>
              <Box sx={{ display: "flex" }}>
                <LocationOn sx={{ color: "grey", fontSize: "15px" }} />
                <Typography component={'a'} href={`/store?id=${review[indexCounter].restaurant_id}`} sx={{ textDecoration: "none", color: "grey", fontSize: "10px" }}>{review[indexCounter].restaurant_name}</Typography>
              </Box>
            </Box>
            <Box sx={{paddingTop : "10px",}}>
                <ButtonBase onClick={clickMoreButton}><MoreHoriz/></ButtonBase>
            </Box>
          </Box>
          <Box sx={{ position:"relative", width: "100%", height: "0", pt: "100%", my: "15px", borderBottom: "0.5px solid grey" }}>
           {
             review[indexCounter].review_images[0].image_url ?
             <img style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, objectFit: "cover" }} alt="review_image" src={review[indexCounter].review_images[0].image_url} />
             :
               <Skeleton variant="rectangular" sx={{position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}/>
            }
          </Box>
          <Box sx={{borderTop: "1px solid #c4c4c4"}}>
            {
              review[indexCounter].content ? 
              <EditorOnlyRead data={review[indexCounter].content}></EditorOnlyRead>
              : <Skeleton variant="text" width={mobileScreen ?  250 : 400} height={50}/>
            }
          </Box>
        </Box>
        <ProfileButton sx={{"&:hover" : {backgroundColor : "transparent", boxShadow: "none"}}} disabled={ indexCounter == review.length - 1} onClick={onClickButton} id="forward" variant="contained" disableTouchRipple><ArrowForwardIos /></ProfileButton>
        <StoryEditModal id={id} open={storyEditModal} onClose={closeEditModal}/>
      </Box>
    </Modal> 
  );
}

export default StoryModal;

