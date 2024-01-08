import {Box, ButtonBase, Rating, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import getRestaurant from "../../../api/getRestaurant";

interface reviewProps {
  src: string,
  reviewId: number,
  reviewData: {
    restaurant: {
      id: string,
      score: number,
    }
    created_at: string,
  },
}

const Review = ({src, reviewId, reviewData}: reviewProps) => {

  const navigate = useNavigate();
  const [restName, setRestName] = useState('');

  const buttonClick = () => {
    return navigate(`/review?id=${reviewId}`);
  }

  const date = new Date(reviewData.created_at);

  const date2 = new Date();


  useEffect(() => {
    const bb = getRestaurant(reviewData.restaurant['id']);
    bb.then((result) => {
      setRestName(result.name);
    });

  }, []);

  return (
    <ButtonBase onClick={buttonClick} sx={{
      flexBasis: "100%", boxShadow: "5", margin: "1.5%", "&:hover": {
        transform: "scale(1.01)",
        backgroundColor: "rgba(0, 0, 0, 0.01)",
      },
    }}>
      <Box sx={{ position : "relative", flexBasis: "30%", height: "0", pt: "30%"}}>
        <img style={{ position :"absolute", top: 0, left: 0, objectFit: "cover", width: "100%", height: "100%"}} src={src} alt="reviewImage"/>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "",
        flexGrow: "480",
        textAlign: "left",
        px: "5%",
      }}>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Typography variant="h5" sx={{fontSize: "1.4vw", overflow: "hidden"}}>
            {restName}
          </Typography>
          <Rating
            name="rating"
            value={reviewData.restaurant['score']}
            readOnly
            sx={{fontSize: "1.3vw"}}
          />
        </Box>
        <Box sx={{textAlign: "right"}}>
          <Typography variant="subtitle1" sx={{fontSize: "0.9vw"}}>
            {(date2.getTime() - date.getTime()) / 60000 <= 1 ? '1분 전' :
              (date2.getTime() - date.getTime()) / 60000 < 60 ? `${Math.floor((date2.getTime() - date.getTime()) / 60000)} 분전` :
                (date2.getTime() - date.getTime()) / 3600000 < 24 ? `${Math.floor((date2.getTime() - date.getTime()) / 3600000)}시간 전` :
                  (date2.getTime() - date.getTime()) / 86400000 < 30 ? `${Math.floor((date2.getTime() - date.getTime()) / 86400000)}일 전` :
                    Math.floor((date2.getTime() - date.getTime()) / 2592000000) < 12 ? `${Math.floor((date2.getTime() - date.getTime()) / 2592000000)}개월 전` :
                      `${Math.floor((date2.getTime() - date.getTime()) / 31104000000)}년 전`} 리뷰
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
}

export default Review;