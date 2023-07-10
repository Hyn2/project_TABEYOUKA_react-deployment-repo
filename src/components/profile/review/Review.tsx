import { Height } from "@mui/icons-material";
import { Box, ButtonBase, Paper } from "@mui/material";

interface reviewProps {
  alt: string,
}

const Review = ({alt} : reviewProps) => {
  return (
    

    <ButtonBase sx={{
    position: "relative",
    width: "100%",
    paddingTop: "33%",
    flexBasis: "33%"}}>
        <img style={{    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",}} src="/public/fukuoka.jpeg" alt={alt} />
    </ButtonBase>
  );
}

export default Review;