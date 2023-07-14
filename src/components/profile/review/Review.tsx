import { ButtonBase } from "@mui/material";

interface reviewProps {
  src: string,
}

const Review = ({src} : reviewProps) => {
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
    objectFit: "cover",}} src={src} alt='aa' />
    {/* 리뷰에 오ㅔ 사진이 없노 */}
    </ButtonBase>
  );
}

export default Review;