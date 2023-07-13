import { Box, Button, Modal, Typography } from "@mui/material"
import type { UseToggle } from "../../../types/hooks.interface";
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "55%",
  height: "85%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const centerStyle = {
  display : "flex", justifyContent : "center", alignItems : "center"
}

export default function FilterModal(props : Omit<UseToggle, "setTrue">){
    return <Modal
    open={props.value}
    onClose={props.setFalse}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{ display: "flex", flexDirection: "column", alignItems : "center", height: "100%"}}>
      <Typography variant="h6" textAlign={"center"} sx={{ my : 2, mr : 1, color : "white", fontWeight : "normal" }}>
          설비/서비스 일람
      </Typography>
      <Button onClick={props.setFalse} sx={{ position : "absolute", right : "22%", top : "2%"}}>
        <CloseIcon htmlColor="white" />
      </Button>
      <Box sx={modalStyle}>
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>레스토랑의 특징</Typography>
        </Box>
        <Box sx={{ width : "100%", height : "17%", ...centerStyle }}>
            
        </Box>
        
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>제공하는 서비스</Typography>
        </Box>
        <Box sx={{ width : "100%", height : "13%", ...centerStyle }}>
            
        </Box>
        
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>이용목적</Typography>
        </Box>
        <Box sx={{ width : "100%", height : "9%", ...centerStyle }}>
            
        </Box>
        
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>레스토랑의 분위기</Typography>
        </Box>
        <Box sx={{ width : "100%", height : "9%", ...centerStyle }}>
            
        </Box>
        
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>결제방법</Typography>
        </Box>
        <Box sx={{ width : "100%", height : "13%", ...centerStyle }}>
            
        </Box>
        
      </Box>
      <Box sx={{ width : "100%" ,mt: "auto", mb : 2, display : "flex", justifyContent : "center" }}>
        <Button sx={{ width : "480px", height : "45px", border : "1px white solid", color : "white"}}>지우기</Button>
        <Button sx={{ width : "480px", height : "45px", ml : 2, bgcolor: "#FFA41B", color: "white", "&:hover": { bgcolor: "#FFC107", transition: "all 0.4s ease-in-out" }}}>설정</Button>
      </Box>
    </Box>
  </Modal>
}