import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const MyButton = styled(Button)({
  color : "black",
  backgroundColor: "transparent",
  boxShadow: "none",
  ':hover': {
    backgroundColor: 'transparent', // 이전에 적용되었던 스타일을 덮어씁니다.
    boxShadow: "none"
  },
  '&.Mui-disabled': {
    backgroundColor: 'inherit', // 이전 스타일을 덮어쓰기
  },
});

export default MyButton;