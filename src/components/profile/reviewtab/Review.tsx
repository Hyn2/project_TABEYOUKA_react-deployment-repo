import {Box, ButtonBase, Rating, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getRestaurant from "../../../api/getRestaurant";

interface reviewProps {
  src: string,
  reviewId : number,
  reviewData : {
    restaurant : {
      id : string,
      score: number,
    }
    created_at : string,
  },
}

const Review = ({src, reviewId, reviewData} : reviewProps) => {

  const navigate = useNavigate();
  const [restName, setRestName] = useState('');

  const buttonClick = () => {
    return navigate(`/review?id=${reviewId}`);
  }

  const date = new Date(reviewData.created_at);

  const date2 = new Date();

  
  useEffect(()=> {
    const bb = getRestaurant(reviewData.restaurant['id']);
    bb.then((result) => {
      setRestName(result.name);
    });

  },[]);

  return (
    <ButtonBase onClick={buttonClick} sx={{ position: "relative", paddingTop: "17%", flexBasis: "90%", boxShadow :"5", margin: "1.5%", "&:hover": {
            transform: "scale(1.01)",
            backgroundColor: "rgba(0, 0, 0, 0.01)",
        },}}>
      <Box sx={{display : "flex", 
                position:"absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"}}>
          <Box sx={{flexBasis: "30%"}}>
                <img style={{width: "100%", height: "100%"}} src={src} alt="reviewImage" />
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", backgroundColor: "", flexGrow: "480", textAlign: "left", px:"5%"}}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent :"center"}}>
              <Typography variant="h5" sx={{fontSize: "1vw", overflow: "hidden"}}>
                {restName}
              </Typography>
              {/* 글자 크기 반응형 처리 */}
              <Rating
                name="rating"
                value={reviewData.restaurant['score']}
                readOnly
                sx={{
                  fontSize: "1.3rem",
                  '@media (max-width: 780px)': {
                    fontSize: '1rem',
                  },
                  '@media (max-width: 425px)': {
                    fontSize: '0.7rem',
                  },
                }}
              />
            </Box>
            <Box sx={{textAlign: "right"}}>
              <Typography variant="subtitle1">
                {(date2.getTime() - date.getTime())/60000 <= 1 ? '1분 전' : 
                (date2.getTime() - date.getTime())/60000 < 60 ? `${Math.floor((date2.getTime() - date.getTime())/60000)} 분전` :
                (date2.getTime() - date.getTime())/3600000 < 24 ? `${Math.floor((date2.getTime() - date.getTime())/3600000)}시간 전` : 
                (date2.getTime() - date.getTime())/86400000 < 30 ? `${Math.floor((date2.getTime() - date.getTime())/86400000)}일 전` : 
                Math.floor((date2.getTime() - date.getTime())/2592000000) < 12 ? `${Math.floor((date2.getTime() - date.getTime())/2592000000)}개월 전` :
                `${Math.floor((date2.getTime() - date.getTime())/31104000000)}년 전` } 리뷰
              </Typography>
          </Box>
          </Box>
      </Box>
    </ButtonBase>
  );
}

export default Review;