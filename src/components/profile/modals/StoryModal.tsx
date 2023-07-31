import { Avatar, Box, ButtonBase, Modal, Typography } from "@mui/material"
import {ArrowBackIos, LocationOn, ArrowForwardIos, MoreHoriz} from '@mui/icons-material';
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyButton from "../MyButton";
import StoryEditModal from "./StoryEditModal";
import { EditorOnlyRead } from "../../common/CKEditor";

interface modalProps {
  id : number,
  open : boolean,
  onClose : () => void,
  image : string,
  storyName : string,
}

const StoryModal = ({id, open, onClose, image, storyName} : modalProps) => {
  const [review, setReview] = useState([{
    restaurant_name: '',
    images: [],
    content: '',
  }]);
  const [indexCounter, setIndexCounter] = useState(0);
  const [storyEditModal, setStoryEditModal] = useState(false);

  useEffect(()=>{
    axios
    .get(`http://localhost:8000/api/story?story_list_id=${id}`,{
      headers : {
        Authorization : window.localStorage.getItem('access_token')
      },
    } )
    .then(response => {
      setReview(response.data);
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
            <Box sx={{paddingTop : "10px",}}>
                <ButtonBase onClick={clickMoreButton}><MoreHoriz/></ButtonBase>
            </Box>
          </Box>
          <Box sx={{ my: "15px", borderBottom: "0.5px solid grey" }}>
            <img style={{ width: "100%" }} src={review[indexCounter].images[0]} />
          </Box>
          <Box>
            <EditorOnlyRead data={review[indexCounter].content}></EditorOnlyRead>
          </Box>
        </Box>
        <MyButton disabled={ indexCounter == review.length-1 ? true : false} onClick={onClickButton} id="forward" variant="contained" disableTouchRipple><ArrowForwardIos /></MyButton>
        <StoryEditModal id={id} open={storyEditModal} onClose={closeEditModal}/>
      </Box>
    </Modal> 
  );
}

export default StoryModal;

