import { Box, TextField, Typography, Checkbox, Button, Modal, ButtonBase } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../reviewtab/LoadingSpinner";
import '../../../styles/loadingSpinner.css';
import { Close } from "@mui/icons-material";

interface storyEditModalProps {
  id : number,
  open : boolean,
  onClose : ()=>void,
}

const StoryEditModal = ({id, open, onClose} : storyEditModalProps) => {

  const [review, setReview] = useState([]);
  const [storyReviewList, setStoryReviewList] =useState<number[]>([]);
  const [storyListName, setStoryListName] = useState('');

  const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const eventId: number = parseInt(event.target.id);
    if(!event.target.checked) {
      setStoryReviewList(()=> storyReviewList.filter(reviewId => reviewId != eventId));
    } else if (event.target.checked) {
      setStoryReviewList([...storyReviewList, eventId]);
    }
  };

  const storyListChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setStoryListName(e.target.value);
  }

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/review`,{
      headers : {
        Authorization : window.localStorage.getItem('access_token')
      },
      params : {
        user_id : window.localStorage.getItem('id'),
      }   
    }
   )
    .then(response => {
      setReview(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    axios
    .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/storylist/${id}`, )
    .then(response => {
      setStoryListName(response.data.story_name);
      setStoryReviewList(response.data.reviews);
    })
    .catch(error => {
      console.error(error);
    });
  });

  const editSubmitFunc = () => {
    // 스토리 아이디 스토리 이름, 스토리에 들어갈 리뷰의 아이디를 바디에 포함.
    axios
    .post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/storylist`, {
      headers : {
        Authorization : window.localStorage.getItem('access_token')
      },
      id : id,
      story_name : storyListName,
      review_list : storyReviewList,
      _method: 'patch',
    })
    .then(response => {
      console.log(response);
      alert("성공적으로 수정되었습니다!");
      onClose();
    })
    .catch(error => {
      console.error(error); 
    })
  }

  const closeModalButton = () => {
    onClose();
  }

  return (
    <Modal sx={{ alignItems: "center", display: "flex", justifyContent: "center" }} open={open} onClose={closeModalButton}>
      <Box sx={{
        display: "flex", flexDirection: "column", width: "500px", mx : "30px",
        borderRadius: "1%", bgcolor: "white", justifyContent: "space-between"
      }}>
        <Box sx={{padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <ButtonBase onClick={closeModalButton} sx={{right :"48%"}}>
            <Close /> 
          </ButtonBase>
          <Typography sx={{marginBottom: "25px"}} variant="subtitle1">ストーリー編集</Typography>
          <TextField onChange={storyListChange} fullWidth id="outlined-basic" label="ストーリー名" variant="outlined" value={storyListName} />
        </Box>
        <Box sx={{ height: "500px", overflow: "scroll"}}>
          <Box sx={{ textAlign : "center", display: "flex", flexWrap: "wrap", justifyContent: "flex-start", flexDirection: review.length ? "row" : "column"}}>
            {
              review.length ? 
                review.map((review) => (
                  <Box key={review['id']} sx={{ flexBasis: "33.3%", width: "100%", height: "0px", paddingBottom: "33.3%", backgroundImage: `url(${review['images'][0]})`, backgroundSize: "cover"}}>
                    <Checkbox id={review['id']} onChange={checkboxHandler} checked={storyReviewList.includes(review['id'])}/>
                  </Box>
                )) : 
                <LoadingSpinner />
            }
          </Box>
        </Box>
        <Box sx={{ padding: "10px", textAlign: "right"}}>
          <Button disabled={storyReviewList.length > 0 ? false : true} onClick={editSubmitFunc} variant="text">登録</Button>
        </Box>
      </Box>
    </Modal>
  );
}     

export default StoryEditModal;

