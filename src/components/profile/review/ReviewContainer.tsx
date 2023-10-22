import { Box, Skeleton, Typography } from "@mui/material";
import ReviewBox from "./Review";
import axios from "axios";
import queryString from 'query-string';
import { Review } from '../../../types/review.interface';
import usePage, { MoreDataFn } from '../../../hooks/usePage';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface reviewContainerProps {
  userId : string,
}

const reviewContainerStyle = {
  display: "flex", 
  flexWrap: "wrap",
  justifyContent: "center"
}

const emptyContainerStyle = {
  display: "flex", 
  flexWrap: "wrap",
  justifyContent: "center" 
}

const ReviewContainer = ({userId} : reviewContainerProps) => {

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
    console.log(response.data);
    return response.data;
  }

  const { search } = useLocation();
  const params = queryString.parse(search);
  const initPage = (params.page ? params.page : '1') as string;
  const initCount = (params.count ? params.count : '10') as string;

  const moreReviews: MoreDataFn<Review> = (page, count) => {
    return getReview(page, count);
  };

  const {
    data: reviews,
    endOfPage,
    unobserve,
    setPage,
    setCount,
  } = usePage<Review, MoreDataFn<Review>>(initPage, initCount, moreReviews);

  useEffect(() => {
    getReview(initPage, initCount);
  },[]);

  return (
    <Box sx={reviews[0] == null ? emptyContainerStyle : reviewContainerStyle}>
      {
        reviews.length
          ? reviews.map((data, index) => <ReviewBox key={index} reviewId={data.id} src={data['images'][0]} reviewData={data} />)
          : reviews[0] == null ? <Typography variant="h4">등록한 리뷰가 없어요</Typography> : Array.from({ length: +initCount }, (_, i) => i).map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              sx={{
              margin: "0.5px",
              width: "100%",
              paddingTop: "33%",
              flexBasis: "33%", }}
            />
      ))
      }
      <div ref={endOfPage} />
    </Box>
  )
}

export default ReviewContainer;