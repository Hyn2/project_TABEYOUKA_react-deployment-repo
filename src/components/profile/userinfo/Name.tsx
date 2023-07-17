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
    <Box sx={{my: "11px", display: "flex", flexDirection: "row"}}>
      <Typography component="span" variant="h5" sx={{ mr: "15px"}}>{children}</Typography>
      <Button onClick={openModal} variant="contained" size="small" sx={{backgroundColor: "black", color: "white"}}>編集</Button>
      <Modal open={modalState} onClose={closeModal}  sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
        <Box>
        <EditModal onClick={closeModal} />
        </Box>
      </Modal>
    </Box>
  );
}

export default Name;
