import { Box, TextField, Typography, Checkbox, Button, Modal } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

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
    .get(`http://localhost:8000/api/review`,{
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
    .get(`http://localhost:8000/api/storylist/${id}`, )
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
    .post("http://localhost:8000/api/storylist", {
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
        display: "flex", flexDirection: "column", width: "400px",
        height: "600px", borderRadius: "1%", bgcolor: "white", justifyContent: "space-between"
      }}>
        <Box sx={{padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Typography sx={{my: "25px"}} variant="subtitle1">기존 목록 수정</Typography>
          <TextField onChange={storyListChange} fullWidth id="outlined-basic" label="수정할 목록 이름" variant="outlined" value={storyListName} />
        </Box>
        <Box sx={{ height: "500px", overflow: "scroll"}}>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start"}}>
            {review.map((review) => (
              <Box key={review['id']} sx={{ flexBasis: "33.3%", width: "100%", height: "0px", paddingBottom: "33.3%", backgroundImage: `url(${review['images'][0]})`, backgroundSize: "cover"}}>
                <Checkbox id={review['id']} onChange={checkboxHandler} checked={storyReviewList.includes(review['id'])}/>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ padding: "10px", textAlign: "right"}}>
          <Button onClick={editSubmitFunc} variant="text">추가</Button>
        </Box>
      </Box>
    </Modal>
  );
}     

export default StoryEditModal;

