import { Avatar, Box, ButtonBase, Modal, Typography } from "@mui/material"
import {ArrowBackIos, LocationOn, ArrowForwardIos, MoreHoriz} from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyButton from "../MyButton";
import StoryEditModal from "./StoryEditModal";

interface modalProps {
  id : string,
  open : boolean,
  onClose : () => void,
  image : string,
}

const StoryModal = ({id, open, onClose, image} : modalProps) => {
  const [review, setReview] = useState([{
    restaurant_name: '',
    review_image: '',
    content: '',
  }]);
  const [indexCounter, setIndexCounter] = useState(0);
  const [storyEditModal, setStoryEditModal] = useState(false);
  const [storyName, setStoryName] = useState('');

  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/story?story_list_id=${id}`, )
    .then(response => {
      setReview(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    axios
    .get(`http://localhost:8000/api/storylist/${id}`, )
    .then(response => {
      console.log(response.data);
      setStoryName(response.data['story_name']);
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
    <Modal open={open} onClose={onClose} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Box sx={{display: "flex"}}>
      <MyButton disabled={ indexCounter == 0 ? true : false} onClick={onClickButton} id="back" variant="contained" disableTouchRipple><ArrowBackIos /></MyButton>
        <Box sx={{
          display: "flex", flexDirection: "column", width: "500px",
          height: "770px", borderRadius: "1%", bgcolor: "white", padding: "10px"
        }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar src={image} sx={{width: "50px", height: "50px" }} />
            <Box sx={{ flexBasis: "82%", display: "flex", flexDirection: "column", alignItems: "left" }}>
              <Typography sx={{ fontSize: "12px", py: "5px", marginLeft: "5px" }}>{storyName}</Typography>
              <Box sx={{ display: "flex" }}>
                <LocationOn sx={{ color: "grey", fontSize: "15px" }} />
                <Typography component={"a"} href="#" sx={{ textDecoration: "none", color: "grey", fontSize: "10px" }}>{review[indexCounter].restaurant_name}</Typography>
              </Box>
            </Box>
            <Box sx={{paddingTop : "10px"}}>
                <ButtonBase onClick={clickMoreButton}><MoreHoriz/></ButtonBase>
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <img style={{ width: "100%" }} src={review[indexCounter].review_image} />
          </Box>
          <Box>
            <Typography>{review[indexCounter].content}</Typography>
          </Box>
        </Box>
        <MyButton disabled={ indexCounter == review.length-1 ? true : false} onClick={onClickButton} id="forward" variant="contained" disableTouchRipple><ArrowForwardIos /></MyButton>
        <StoryEditModal id={id} open={storyEditModal} onClose={closeEditModal}/>
      </Box>
    </Modal> 
  );
}

export default StoryModal;

