import { Box } from "@mui/material";
import Review from "./Review";
import { useState } from "react";

const ReviewContainer = () => {

  const [count, setCount]  = useState("0");

  const increaseCount = () => {
    // 리뷰 갯수 하나당 위 함수를 실행해줘야함
    setCount(count + 1);
  }

  return (
    <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
      <Review alt={count}/>
      <Review alt={count}/>
      <Review alt={count}/>
    </Box>
  )
}

export default ReviewContainer;

