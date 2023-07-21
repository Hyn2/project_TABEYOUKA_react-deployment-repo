import { Box, Button, Modal, Typography, useMediaQuery } from "@mui/material";
import EditModal from "../modals/EditModal";
import { useState } from "react";
import MyButton from "../MyButton";
import axios from "axios";


interface nameProps {
  userId : string,
  children : React.ReactNode,
}

const Name = ({userId, children} : nameProps) => {

  const [modalState, setModalState] = useState(false);

  const openModal =() => setModalState(true);
  const closeModal = () => setModalState(false);
  const mobileScreenFlex = useMediaQuery('(max-width:1500px)');
  const mobileScreenFontSize = useMediaQuery('(max-width: 1210px)');

  const addFollow = (event : React.MouseEvent<HTMLButtonElement>) => {
    const followId = event.currentTarget.id;
    axios.post('http://localhost:8000/api/follow', {
      idToken : window.localStorage.getItem('id_token'),
      follow_id : followId,
    })
  }

  return (
    <Box sx={{ py:"11px", display: "flex", alignItems: "center", flexDirection: mobileScreenFlex ? "column" : "row"}}>
        <Typography sx={{paddingTop : "10px"}} component="span" variant="h5">{children}</Typography>
      <Box sx={{display : "flex", flexDirection : "row", width: "50%", justifyContent: "space-evenly"}}>
        <Button onClick={openModal} variant="contained" size="small" sx={{ marginTop : "10px", fontSize: mobileScreenFontSize ? "65%" : "100%", marginRight: "10px", backgroundColor: "black", color: "white"}}>編集</Button>
        <Button id={userId} onClick={addFollow} variant="contained" size="small" sx={{ marginTop: "10px", fontSize: mobileScreenFontSize ? "65%" : "100%", backgroundColor: "black", color: "white"}}>ファロー</Button>
        <EditModal userId={userId} open={modalState} onClose={closeModal} />
      </Box>
    </Box>
  );
}

export default Name;
