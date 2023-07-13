import { Box, Button } from "@mui/material";
import Layout from "../components/layout";
import GoogleLoginButton from "../components/socialLogin/GoogleLoginButton";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    return (
        <Layout>
            <Box sx={{ width : "100%", height : "950px", bgcolor : "#EEEEEE", display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
              <Box sx={{ width : "20%", height : "10%", display : "flex", justifyContent : "center", alignItems : "center"  }}>
                <Box sx={{ width : "18%", height : "70%", backgroundImage : "url(/tabeyoukaMiniLogo.png)", backgroundSize : "cover" }}></Box>
              </Box>
              <GoogleLoginButton id={""} width="300px"/>
            </Box>
        </Layout>
    )
}


export default LoginPage;