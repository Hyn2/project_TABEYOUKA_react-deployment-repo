import { Box, Button, Typography } from "@mui/material";
import Review from "./Review";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface reviewContainerProps {
  userId : string,
}

const reviewContainerStyle = {
  display: "flex", 
  flexWrap: "wrap",
  justifyContent: "flex-start"
}

const textContainerStyle = {
  display: "flex", 
  flexWrap: "wrap", 
  marginTop : "20px",
  justifyContent: "center"
}

const ReviewContainer = ({userId} : reviewContainerProps) => {
  const [review, setReview] = useState([]);
  
  useEffect(() => {
    // 현재 유저의 정보
    axios.get(`http://localhost:8000/api/review`, {
      params: {
        user_id: userId,
        idToken : localStorage.getItem('id_token'),
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
    <Box sx={review.length == 0 ? textContainerStyle : reviewContainerStyle }>

    {
    review.length == 0 ? (
      <Box sx={{textAlign : "center"}}>
        <Typography variant="h2"> 리뷰가 없어요 </Typography>
      </Box>
    ) : (
      review.map((user) => (
        <Review key={user['id']} src={user['review_image']}/>
      ))
    )}
    </Box>
  )
}

export default ReviewContainer;

