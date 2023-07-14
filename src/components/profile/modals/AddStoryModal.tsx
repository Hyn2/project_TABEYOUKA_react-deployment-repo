import { Box, TextField, Typography, Checkbox, Button, Modal } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";

interface AddStoryModalProps {
  open : boolean,
  onClose : ()=>void,
}

const AddStoryModal = ({open, onClose} : AddStoryModalProps) => {

  const [review, setReview] = useState([]);
  const [reviewList, setReviewList] =useState<string[]>([]);

  const checkboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const id: string = event.target.id;
    if(!event.target.checked) {
      setReviewList(reviewList => reviewList.filter(reviewId => reviewId !== id));
      
    } else if (event.target.checked) {
      setReviewList(reviewList => [...reviewList, id]);
      console.log(reviewList);
    }
  };
  
  const [storyListName, setStoryListName] = useState('');

  const storyListChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setStoryListName(e.target.value);
  }

  const submitFunc = () => {
    console.log('추가');
    axios.post('http://localhost:8000/api/storylist', {
      user_id: 'justin010129@gmail.com',
      story_name : storyListName,
      review_list : reviewList,
    })
    .then(response => {
      alert('스토리가 성공적으로 등록되었습니다.');
      onClose();
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    axios
    .get("http://localhost:8000/api/review?user_id=justin010129@gmail.com", )
    .then(response => {
      setReview(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
  return (
    <Modal open={open} onClose={onClose}  sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Box sx={{
        display: "flex", flexDirection: "column", width: "500px",
        height: "770px", borderRadius: "1%", bgcolor: "white", justifyContent: "space-between"
      }}>
        <Box sx={{padding: "10px", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Typography sx={{my: "25px"}} variant="subtitle1">새로운 목록 생성하기</Typography>
          <TextField onChange={storyListChange} fullWidth id="outlined-basic" label="새 목록 이름" variant="outlined" value={storyListName} />
        </Box>
        <Box sx={{ height: "500px", overflow: "scroll"}}>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start"}}>
            {review.map((review) => (
              <Box key={review['id']} sx={{ flexBasis: "33.3%", width: "100%", height: "0px", paddingBottom: "33.3%", backgroundImage: "url('./public/steak.webp')", backgroundSize: "cover"}}>
                <Checkbox id={String(review['id'])} onChange={checkboxHandler} />
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ padding: "10px", textAlign: "right"}}>
          <Button onClick={submitFunc} variant="text">추가</Button>
        </Box>
      </Box>
    </Modal>
  );
}     

export default AddStoryModal;

