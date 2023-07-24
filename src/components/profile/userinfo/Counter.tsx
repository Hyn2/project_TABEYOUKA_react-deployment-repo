import { Box, Button, List, Modal, Typography, useMediaQuery } from "@mui/material";
import UserModal from "../modals/UserModal";
import { useState } from "react";
import MyButton from "../MyButton";

interface counterProps {
  title: string,
  count: number,
  counterType: string,
  userId: string,
}

const buttonStyles = {
  minWidth: 0, 
  color: "black", 
  padding: 0, 
  mr: "5%"
}

const Counter = ({title, count, counterType, userId} : counterProps) => {
  const mobileScreenFontSize = useMediaQuery('(max-width: 1210px)');
  const [userModalState, setUserModalState] = useState(false);

  const openUserModal =() => {
    setUserModalState(true);
  }
  const closeUserModal = () => {
    setUserModalState(false);
  }

  return (
    <>
      <MyButton disabled={(counterType == "reviews") ? true : false} onClick={openUserModal} sx={buttonStyles}>
        <Box>
          <Typography  component= "span" sx={{ fontSize : mobileScreenFontSize ? "78%" : "100%", textDecoration: "none", color: "inherit", mr: "3px"}}>{title}</Typography>
          <Typography  component= "span" sx={{fontSize : mobileScreenFontSize ? "78%" : "100%", fontWeight: "bold"}}>{count}</Typography>
        </Box>
      </MyButton>
      <Modal open={userModalState} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "500px", padding: "30px", bgcolor: "white",display: "flex", flexDirection: 'column', borderRadius: "1%"}}>
      <Box>
        <List>
          <UserModal userId={userId} userModalType={counterType}/>
        </List>
       </Box>
        <Box sx={{textAlign: "right"}}>
          <Button onClick={closeUserModal} sx={{width: "50px", float: "right"}}>닫기</Button>
        </Box>
      </Box>
      </Modal>
    </>
  )
}

export default Counter;               