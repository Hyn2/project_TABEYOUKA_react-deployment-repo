import { Box } from "@mui/material";
import Review from "./Review";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewContainer = () => {

  const [review, setReview] = useState([]);
  
  useEffect(() => {
    // 현재 유저의 정보
    axios.get('http://localhost:8000/api/reviews?user_id=justin010129@gmail.com')
      .then(response => {
        setReview(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []); 

  return (
    <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "flex-start"}}>
    {review.map((user) => (
      <Review key={user['id']} src={user['review_image']}/>
    ))}
    </Box>
  )
}

export default ReviewContainer;

