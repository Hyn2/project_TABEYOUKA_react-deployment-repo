import { ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface reviewProps {
  src: string,
  reviewId : number,
}

const Review = ({src, reviewId} : reviewProps) => {

  const navigate = useNavigate();

  const buttonClick = () => {
    return navigate(`/review?id=${reviewId}`);
  }


  return (
    <ButtonBase
    onClick={buttonClick}
    sx={{
    position: "relative",
    width: "100%",
    paddingTop: "33%",
    flexBasis: "33%"}}>
      <img style={{    position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",}} src={src} alt='Review_Image' />
    </ButtonBase>
  );
}

export default Review;