import { Button, Container, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate } from 'react-router-dom';
import type { IProps } from '../../../types/common.interface';

export default function StoreHeader({ children }: IProps) {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ height : "auto", borderBottom : "#C2C2C2 1px dashed" }}>
        <Button onClick={goback} sx={{ width : "100%", height : "30px", display : "flex", justifyContent : "flex-start" , py : 1, pl : 0 }}>
          <ArrowCircleLeftIcon htmlColor="skyblue" />
          <Typography sx={{ fontSize : "16px" }}>戻る</Typography>
        </Button>
      </Container>
      {children}
    </>

  );
}
