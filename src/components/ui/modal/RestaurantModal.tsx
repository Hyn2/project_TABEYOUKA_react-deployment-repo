import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import type { UseToggle } from "../../../types/hooks.interface";
import { useEffect } from "react";
import useInput from "../../../hooks/useInput";
import StorefrontIcon from '@mui/icons-material/Storefront';

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

export default function RestaurantModal(props: Omit<UseToggle, "setTrue"> & { setRestaurant: (category: string) => void }){

    const textInput = useInput("");
    
    useEffect(()=>{
      console.log(textInput.value)
    },[textInput.value])

    return <Modal
    open={props.value}
    onClose={props.setFalse}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Box sx={{ ...centerStyle, bgcolor : "white", width : "100%", height : "5%" }}>
        <Box sx={{ ...centerStyle, width : "55%", height : "100%" }}>

          <Box sx={{ width : "5%", height : "100%" }}>
            <Button onClick={props.setFalse} sx={{ p : 0, minWidth : "100%", height : "100%" }}>
              <ArrowBackIcon />
            </Button>
          </Box>

          <Box sx={{ width : "95%", height : "100%" }}>
          
            <TextField
              label="검색어를 입력하세요"
              variant="standard"
              color="success"
              {...textInput}
              sx={{ width : "100%"}}
            />
          
          </Box>
        </Box>
      </Box>

      <Box sx={{ ...centerStyle, width : "100%", height : "10%" }}>
        <Box sx={{ width : "53%", height : "100%" }}>
          <Box sx={{ display : "flex" ,bgcolor : "white", width : "100%", height : "90%", my : 1, px : 2, boxShadow : "5px 5px 5px #C2C2C2", flexDirection : "column" }}>
            <Box sx={{ width : "100%", height : "70px", borderBottom : "#C2C2C2 1px dashed" }}>
              <Button sx={{ width : "100%", height : "100%", py : 1 }} >
                <Box sx={{ width : "2%", height : "100%", textAlign : "left" }}>
                  <StorefrontIcon sx={{ fontSize : "16px", mb : 1 }} />
                </Box>
                <Box sx={{ width : "98%", height : "100%", textAlign : "left" }}>
                  <Typography sx={{ fontSize : "12px", color : "black" }}>음식점</Typography>
                  <Typography sx={{ fontSize : "12px", color : "black" }}>음식점</Typography>
                </Box>
              </Button>
            </Box>
            <Box sx={{ width : "100%", height : "50px", p : 1 }}>
              <Typography sx={{ fontSize : "14px", color : "#787A91" }}>키워드로 검색하기 "{textInput.value}"</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Modal>
}