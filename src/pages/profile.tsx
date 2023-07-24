import { Box, useMediaQuery } from "@mui/material";
import UserTab from "../components/profile/tab/UserTab";
import Categories from "../components/profile/category/Categories";
import UserInfo from "../components/profile/userinfo/UserInfo";

function ProfilePage() {
  const queryString = window.location.search;
  const mobileScreen = useMediaQuery('(max-width: 800px)');
  const url = new URLSearchParams(queryString);
  const params = {
    userId: `${url.get("user_id")}`
  }

    return (
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <Box sx={{flexBasis: mobileScreen ? "100%" : "50%", width: "100%", height : "100%"}}>
            <Box sx={{height: "150px"}} />
            <UserInfo userId={params.userId} />
            <Categories id={params.userId} />
            <hr style={{margin: 0}}/>
            <UserTab userId={params.userId} /> 
          </Box>
        </Box>
    )
}

export default ProfilePage;