import { Box, Skeleton } from "@mui/material";
import ReviewBox from "./Review";
import axios from "axios";
import queryString from 'query-string';
import { Review } from '../../../types/review.interface';
import usePage, { MoreDataFn } from '../../../hooks/usePage';
import { useLocation } from "react-router-dom";
import '../../../styles/loadingSpinner.css';

interface reviewContainerProps {
  userId : string,
}

const reviewContainerStyle = {
  display: "flex", 
  flexWrap: "wrap",
  justifyContent: "flex-start"
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
    return response.data;
  }

  const { search } = useLocation();
  const params = queryString.parse(search);
  const initPage = (params.page ? params.page : '1') as string;
  const initCount = (params.count ? params.count : '9') as string;

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

  return (
    <Box sx={reviewContainerStyle}>
      {
        // reviews.map((user) => (
        //   <ReviewBox key={user['id']} reviewId={user['id']} src={user['images'][0]}/>
        // ))
        reviews.length
          ? reviews.map((data) => <ReviewBox key={data.id} reviewId={data['id']} src={data['images'][0]} />)
          : Array.from({ length: +initCount }, (_, i) => i).map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width="300px"
                height="300px"
                sx={{margin: "1px"}}
              />
          ))
      }
      <div ref={endOfPage} />
    </Box>
  )
}

export default ReviewContainer;