import { Box } from "@mui/material";
import LocationBtn from "./locationBtn";
import CategoryBtn from "./categoryBtn";
import RestaurantBtn from "./ restaurantBtn";
import SearchBtn from "./searchBtn";



const WhiteBox = () => {
  

  return (
    <Box sx={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",width: "100%",height: "17%", display : "flex", justifyContent : "center"}}>
      <Box sx={{ backgroundColor : "white", width : "37%", height : "100%", borderRadius: "10px", display : "flex" }}>
        <Box sx={{ width : "70%", display : "flex", m : "12px", flexDirection : "column"}}>

          <Box sx={{ width : "100%", m : "5px", display : "flex", my : 1}}>
            <LocationBtn />
            <CategoryBtn />
          </Box>
          
          <Box sx={{ width : "97.8%", ml : "12px", border : "1px solid #787A91", borderRadius : "5px", my : 1, display : "flex" }}>
            <RestaurantBtn />
          </Box>
          
        </Box>
        
        <Box sx={{ width : "30%", display : "flex", borderRadius : "5px", my : 7, mx : 2, bgcolor: "#FFA41B", color: "white", "&:hover": { bgcolor: "#FFC107", transition: "all 0.4s ease-in-out" }}}>
            <SearchBtn />
        </Box>
        
      </Box>
    </Box>
  );
};

export default WhiteBox;