import { Box, Button, Modal, Typography } from "@mui/material"
import DiningOutlinedIcon from '@mui/icons-material/DiningOutlined';
import React from "react";


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 8,
};

const centerStyle = {
  display : "flex", justifyContent : "center", alignItems : "center"
}

const CategoryBtn = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button onClick={handleOpen} sx={{ color : "black", flexGrow : 1, py : 1.5, border : "1px solid #787A91", justifyContent: "flex-start"}}>
          <DiningOutlinedIcon sx={{ color : "orange" }} />
          <Typography variant='caption' sx={{ fontSize : "16px", mx : 1, color : "#787A91" }}>
            요리 장르
          </Typography>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Typography variant="h6" textAlign={"center"} sx={{ my : 2, color : "white", fontWeight : "normal" }}>
                요리 장르
            </Typography>
            <Box sx={modalStyle}>
              <Box sx={{ width : "100%", height : "10%", ...centerStyle, justifyContent : "flex-start", p : 2, borderTop : "0.5px dashed black" }}>
                <Typography sx={{  }}>
                  모든 요리 장르
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </>
    )
}

export default CategoryBtn