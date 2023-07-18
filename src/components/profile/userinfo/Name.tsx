import { Box, Button, Modal, Typography } from "@mui/material";
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

  const addFollow = () => {
    axios.post('http://localhost:8000/api/follow', {
      // user_id : ,
      // follow_id : userId, 
    })
  }

  return (
    <Box sx={{my: "11px", display: "flex", flexDirection: "row"}}>
      <Typography component="span" variant="h5" sx={{}}>{children}</Typography>
      <Box sx={{display : "flex", flexDirection : "row", width: "50%", justifyContent: "space-evenly"}}>
      <Button onClick={openModal} variant="contained" size="small" sx={{backgroundColor: "black", color: "white"}}>編集</Button>
      <Button onClick={addFollow} variant="contained" size="small" sx={{backgroundColor: "black", color: "white"}}>ファロー</Button>
      <EditModal userId={userId} open={modalState} onClose={closeModal} />
      </Box>
    </Box>
  );
}

export default Name;
