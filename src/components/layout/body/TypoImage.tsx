import { Container, Typography } from "@mui/material";
import WhiteBox from "./searchBox";


const TypoImage = () => {


    return (
        <>
            <Container maxWidth={false} sx={{ px : "0 !important",backgroundImage : `url(${"https://www.exploretravel.com.au/images/transform/v1/crop/frm/130854433/1b6a6656-f316-4d72-ba10-2067288e49b7.jpg/r0_138_2700_1662_w1200_h678_fmax.jpg"})`, height : "75vh", backgroundRepeat : "no-repeat", backgroundSize : "cover", position : "relative"}}></Container>
            <Typography color={"white"} fontSize={"48px"} sx={{ position : "absolute", top : "32%", left : "50%", fontWeight : "bold", textAlign : "center", transform: "translate(-50%, -50%)"}}>가고 싶은 가게를 지금바로 찾아보세요!</Typography>
            <WhiteBox />
            
        </>
    );
  }
  
export default TypoImage;