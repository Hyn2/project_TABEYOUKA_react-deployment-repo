import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const modalStyle = {
  position: 'absolute',
  width: "100%",
  height: "100%",
  bgcolor: '#EEEEEE',
  pb: 5,
};

const centerStyle = {
  display : "flex", justifyContent : "center", alignItems : "center"
}

const RestaurantBtn = () => {
    

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
          <Button onClick={handleOpen} sx={{ color : "black", py : 1.5, flexGrow : 1, justifyContent: "flex-start"}}>
              <SearchIcon sx={{ color : "#99DBF5" }} />
              <Typography variant='caption' sx={{ fontSize : "16px", mx : 1, color : "#787A91" }}>
              레스토랑 이름
              </Typography>
          </Button>
          
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Box sx={{ ...centerStyle, bgcolor : "white", width : "100%", height : "5%" }}>
                <Box sx={{ ...centerStyle, width : "55%", height : "100%" }}>

                  <Box sx={{ width : "5%", height : "100%" }}>
                    <Button onClick={handleClose} sx={{ p : 0, minWidth : "100%", height : "100%" }}>
                      <ArrowBackIcon />
                    </Button>
                  </Box>

                  <Box sx={{ width : "95%", height : "100%" }}>
                  
                    <TextField
                      label=" "
                      variant="standard"
                      multiline
                      color="success"
                      sx={{ width : "100%"}}
                    />
                  
                  </Box>
                </Box>
              </Box>

              <Box sx={{ ...centerStyle, width : "100%", height : "10%" }}>
                <Box sx={{ width : "53%", height : "100%" }}>
                  <Box sx={{ display : "flex", alignItems : "center", bgcolor : "white", width : "100%", height : "90%", my : 1, px : 2, boxShadow : "5px 5px 5px #C2C2C2" }}>
                    <Typography sx={{ fontSize : "14px", color : "#787A91" }}>키워드로 검색하기</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
    )
}

export default RestaurantBtn