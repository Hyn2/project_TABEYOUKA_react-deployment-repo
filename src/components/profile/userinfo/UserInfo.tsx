import { Box } from "@mui/material";
import ProfileImage from "./ProfileImage";
import Counter from "./Counter";
import Bio from "./Bio";
import Name from "./Name";

const UserInfo = () => {
  return (
    <Box sx={{height: "230px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
    <Box sx={{height:"150px", width: "150px"}}>
      <ProfileImage src="/public/tabeyoukaLogo.png" alt="Hyun"/>
    </Box>
    <Box sx={{ paddingTop: "0.2%",width: "34%", display: "flex", flexDirection: "column"}}>
      <Name>hyn2</Name>
      <Box sx={{display: "flex", my: "7px"}}>
        <Counter title="리뷰 " count={123}/>
        <Counter title="팔로잉 " count={123}/>
        <Counter title="팔로워 " count={123}/>
      </Box>
      <Bio>안녕하세요.</Bio>
    </Box>
  </Box>
  );
}

export default UserInfo;