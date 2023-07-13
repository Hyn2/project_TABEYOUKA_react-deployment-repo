// import { Box } from "@mui/material";
import { Box } from "@mui/material";
import Layout from "../components/layout";
import UserTab from "../components/profile/tab/UserTab";
import Categories from "../components/profile/category/Categories";
import UserInfo from "../components/profile/userinfo/UserInfo";

function ProfilePage() {
    return (
      <Layout>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Box sx={{flexBasis: "auto"}} />
          <Box sx={{flexBasis: "51%", width: "100%", height : "100%"}}>
            <Box sx={{height: "150px"}} />
            <UserInfo />
            <Categories />
            <hr style={{margin: 0}}/>
            <UserTab /> 

          </Box>
          <Box sx={{flexBasis: "auto"}} />
        </Box>
      </Layout>
    )
}

export default ProfilePage;