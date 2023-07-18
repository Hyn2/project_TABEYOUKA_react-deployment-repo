// import { Box } from "@mui/material";
import { Box } from "@mui/material";
import Layout from "../components/layout";
import UserTab from "../components/profile/tab/UserTab";
import Categories from "../components/profile/category/Categories";
import UserInfo from "../components/profile/userinfo/UserInfo";

function ProfilePage() {
  const queryString = window.location.search;
  const url = new URLSearchParams(queryString);
  const params = {
    userId: `${url.get("user_id")}`
  }

    return (
      <Layout>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Box sx={{flexBasis: "auto"}} />
          <Box sx={{flexBasis: "50%", width: "100%", height : "100%"}}>
            <Box sx={{height: "150px"}} />
            <UserInfo userId={params.userId} />
            <Categories id={params.userId} />
            <hr style={{margin: 0}}/>
            <UserTab userId={params.userId} /> 
          </Box>
          <Box sx={{flexBasis: "auto"}} />
        </Box>
      </Layout>
    )
}

export default ProfilePage;