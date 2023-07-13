import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import {Close} from '@mui/icons-material';

import type { UseToggle } from "../../../types/hooks.interface";

const modalStyle = {
  position: 'absolute',
  width: "100%",
  height: "100%",
  bgcolor: '#EEEEEE',
};


export default function MapModal(props : Omit<UseToggle, "setTrue">){
    return <Modal
    open={props.value}
    onClose={props.setFalse}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box>
      <Box sx={{ width : "100%", height : "60px" }}>
        <Typography variant="h6" textAlign={"center"} sx={{ my : 2, mr : 1, color : "white", fontWeight : "normal" }}>
            지도
        </Typography>
        <Button onClick={props.setFalse} sx={{ position : "absolute", right : "22%", top : "2%"}}>
        <Close htmlColor="white" />
        </Button>
      </Box>
      <Box sx={modalStyle}>
      
      </Box>
    </Box>
  </Modal>
}