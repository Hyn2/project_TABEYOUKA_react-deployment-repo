import { Box, TextField, Typography, Checkbox, Button, Modal, ButtonBase } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../reviewtab/LoadingSpinner";
import '../../../styles/loadingSpinner.css'; 
import {Close} from '@mui/icons-material';

interface AddStoryModalProps {
  userId : string,
  open : boolean,
  onClose : ()=>void,
}

const checkBoxStyles = {
  position: "absolute", 
  top: 0, 
  left: 0, 
  paddingRight: "100%", 
  paddingBottom:"100%"
}

const AddStoryModal = ({userId, open, onClose} : AddStoryModalProps) => {

  const [review, setReview] = useState([]);
  const [reviewList, setReviewList] =useState<string[]>([]);
  const [storyListName, setStoryListName] = useState('');

  const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const id: string = event.target.id;
    if(!event.target.checked) {
      setReviewList(reviewList => reviewList.filter(reviewId => reviewId !== id));
      console.log(reviewList);
      
    } else if (event.target.checked) {
      setReviewList(reviewList => [...reviewList, id]);
      console.log(reviewList);
    }
  };
  
  const onCloseModal = () => {
    setReviewList([]);
    setStoryListName('');
    onClose();
  }

  const storyListNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setStoryListName(e.target.value);
  };

  const submitFunc = () => {
    axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/storylist`, {
      access_token: window.localStorage.getItem('access_token'),
      user_id: window.localStorage.getItem('id'),
      story_name : storyListName,
      review_list : reviewList,
    })
    .then(() => {
      alert('レビューストーリーが成功的に登録されました。');
      onClose();
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(()=>{
    axios
    .get(`${import.meta.env.VITE_REACT_APP_BASE_URI}/api/review`,{
    headers : {
      Authorization : window.localStorage.getItem('access_token')
    },
     params : {
      user_id : userId,
     }
    })
    .then(response => {
      setReview(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <Modal open={open} onClose={onCloseModal}  sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Box sx={{
        display: "flex", flexDirection: "column", width: "500px", mx : "30px",
         borderRadius: "1%", bgcolor: "white", justifyContent: "space-between"
      }}>
        <Box sx={{padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <ButtonBase onClick={onCloseModal} sx={{right :"48%"}}>
            <Close /> 
          </ButtonBase>
          <Typography sx={{marginBottom: "25px"}} variant="subtitle1">新しいストーリー作成</Typography> 
          <TextField onChange={storyListNameChange} fullWidth id="outlined-basic" label="新しいストーリー名" variant="outlined" value={storyListName} />
        </Box>
        <Box sx={{ height: "500px", overflow: "scroll"}}>
          <Box sx={{ textAlign: "center", display: "flex", flexWrap: "wrap", justifyContent: "flex-start", flexDirection: review.length ? "row" : "column"}}>
            {
              review.length ? 
              review.map((review) => (
                <Box key={review['id']} sx={{ position: "relative", overflow:"hidden", 
                flexBasis: "33.3%", width: "100%", height: "0px", paddingBottom: "33.3%", 
                backgroundImage: `url(${review['images'][0]})`, backgroundSize: "cover"}}>
                  <Checkbox sx={checkBoxStyles} id={String(review['id'])} onChange={checkboxHandler} />
                </Box> 
              )):
              <LoadingSpinner />
            }
          </Box>
        </Box>
        <Box sx={{ padding: "10px", textAlign: "right"}}>
          <Button disabled={reviewList.length > 0 && storyListName ? false : true} onClick={submitFunc} variant="text">登録</Button>
        </Box>
      </Box>
    </Modal>
  );
}     

export default AddStoryModal;

