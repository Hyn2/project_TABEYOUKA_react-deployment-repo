import { Box } from "@mui/material";
import ReviewBox from "./Review";
import axios from "axios";
import queryString from 'query-string';
import { Review } from '../../../types/review.interface';
import usePage, { MoreDataFn } from '../../../hooks/usePage';
import { useLocation } from "react-router-dom";
import '../../../styles/loadingSpinner.css';
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

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

  const [loading, setLoading] = useState(false);

  async function getReview (page : string, count : string) : Promise<Review[]> {
    const response = await axios.get(`http://localhost:8000/api/review`, {
      headers : {
        Authorization : window.localStorage.getItem('access_token')
      },
      params: {
        user_id: userId,
        page : page,
        count : count,
      }   
    });
    setLoading(false);
    return response.data;
  }

  const { search } = useLocation();
  const params = queryString.parse(search);
  const initPage = (params.page ? params.page : '1') as string;
  const initCount = (params.count ? params.count : '6') as string;

  const moreReviews: MoreDataFn<Review> = (page, count) => {
    setLoading(true);
    console.log(loading);
    return getReview(page, count);
  };

  const {
    data: reviews,
    endOfPage,
  } = usePage<Review, MoreDataFn<Review>>(initPage, initCount, moreReviews);

  return (
    <Box sx={reviews.length == 0 ? textContainerStyle : reviewContainerStyle }>
    {
      reviews.map((user) => (
        <ReviewBox key={user['id']} reviewId={user['id']} src={user['images'][0]}/>
      ))
    }
    {loading ? (<LoadingSpinner/>) : <></>}
    <div ref={endOfPage}></div>
    </Box>
  )
}

export default ReviewContainer;