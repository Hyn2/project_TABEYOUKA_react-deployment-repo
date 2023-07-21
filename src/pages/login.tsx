import { Box, Typography } from "@mui/material";
import Layout from "../components/layout";
import GoogleLoginButton from "../components/socialLogin/GoogleLoginButton";

function LoginPage() {
    return (
        <Layout>
            <Box sx={{ width : "100%", height : "950px", bgcolor : "#EEEEEE", display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
              <Box sx={{ width : "40%", height : "10%", display : "flex", justifyContent : "center", alignItems : "center"  }}>
                {/* <Box sx={{ width : "18%", height : "70%", backgroundImage : "url(/tabeyoukaMiniLogo.png)", backgroundSize : "cover" }}></Box> */}
                <Typography sx={{}} variant="h2">今日は何を食べようか？</Typography>
              </Box>
              <Box sx={{marginTop : "30px"}}>
                <GoogleLoginButton id={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID} width="300px"/>
              </Box>
            </Box>
        </Layout>
    )
}


export default LoginPage;