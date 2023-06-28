import { Box, Button, Modal, Typography } from "@mui/material"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import React from "react"
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import ImageSlider from "./imageSlider";

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
  pb: 5,
};

const centerStyle = {
  display : "flex", justifyContent : "center", alignItems : "center"
}

const LocationBtn = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button onClick={handleOpen} sx={{ color : "black", flexGrow : 1, py : 1.5, mx : 1, border : "1px solid #787A91", justifyContent: "flex-start", display : "flex"}}>
          <LocationOnOutlinedIcon sx={{ color : "green" }} />
          <Typography variant='caption' sx={{ fontSize : "16px", mx : 1, color : "#787A91" }}>
            위치
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
                위치
            </Typography>
            <Box sx={modalStyle}>
              {/* 현재위치 */}
              <Box sx={{ width : "100%", height : "15%", ...centerStyle }}>
                <Button sx={{ width : "40%", height : "40%", fontSize : "18px", color : "black", "&:hover": { border : "0.5px solid red", transition: "all 0.3s ease-in-out" }, "&:not(:hover)": { border : "1px #EEEEEE solid", transition: "all 0.3s ease-in-out" } }}>
                <MyLocationIcon sx={{ color : "red", mr : 0.5 }}/>
                  현위치보기
                </Button>
              </Box>
              {/* 지역이름 텍스트 */}
              <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
                <Typography fontSize={"22px"} fontWeight={"500"}>지역 이름</Typography>
              </Box>
              {/* 지역 검색창 */}
              <Box sx={{ width : "100%", height : "15%", ...centerStyle }}>
                <Button sx={{ border : "1px #C2C2C2 solid", width : "40%", height : "40%", fontSize : "18px", color : "#C2C2C2", justifyContent : "flex-start" }}>
                <SearchIcon sx={{ color : "#99DBF5", mr : 1 }} />
                  지역
                </Button>
              </Box>
              {/* 전체지역 텍스트 */}
              <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
                <Typography fontSize={"22px"} fontWeight={"500"}>전체 지역</Typography>
              </Box> 
              {/* 지역선택 슬라이더 */}
              <Box sx={{ width : "100%", height : "54%", ...centerStyle }}>
                <ImageSlider ></ImageSlider>
              </Box>
            </Box>
          </Box>
        </Modal>
      </>
      
    )
}

export default LocationBtn