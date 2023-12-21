import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const MyButton = styled(Button)({
  color: "black",
  backgroundColor: "transparent",
  boxShadow: "none",
  "&.Mui-disabled": {
    backgroundColor: "inherit", // 이전 스타일을 덮어쓰기
    color: "rgba(0,0,0,1)",
  },
});

export default MyButton;
