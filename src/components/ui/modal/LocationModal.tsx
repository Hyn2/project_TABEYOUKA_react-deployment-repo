import { Box, Button, Modal, Typography } from "@mui/material"
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import ImageSlider from "../../common/ImageSlider";

import type { UseToggle } from "../../../types/hooks.interface";


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

export default function LocationModal(props : Omit<UseToggle, "setTrue">){
    return <Modal
    open={props.value}
    onClose={props.setFalse}
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
            <ImageSlider />
        </Box>
      </Box>
    </Box>
  </Modal>
}