import { Box, Button, Modal, Typography } from "@mui/material";
import EditModal from "../modals/EditModal";
import { useState } from "react";


interface nameProps {
  children : React.ReactNode,
}

const Name = ({children} : nameProps) => {

  const [modalState, setModalState] = useState(false);

  const openModal =() => setModalState(true);
  const closeModal = () => setModalState(false);

  return (
    <Box sx={{my: "7px", display: "flex", flexDirection: "row"}}>
      <Typography component="span" variant="h5" sx={{ mr: "15px"}}>{children}</Typography>
      <Button onClick={openModal} variant="contained" size="small" sx={{backgroundColor: "black", color: "white"}}>프로필 수정</Button>
      <Modal open={modalState} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "500px", padding: "30px", bgcolor: "white",display: "flex", flexDirection: 'column', borderRadius: "1%"}}>
        <EditModal />
        <Box sx={{textAlign: "right"}}>
          <Button sx={{width: "50px", float: "right"}}>수정</Button>
          <Button onClick={closeModal} sx={{width: "50px", float: "right"}}>취소</Button>
        </Box>
      </Box>
      </Modal>
    </Box>
  );
}

export default Name;
