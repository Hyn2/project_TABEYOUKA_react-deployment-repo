import { Box, Typography } from "@mui/material";
import Layout from "../components/layout";
import { Box, Typography } from "@mui/material";
import GoogleLoginButton from "../components/socialLogin/GoogleLoginButton";


function LoginPage() {
  return (
      <Box sx={{width: "100%", height: "1000px", bgcolor: "#EEEEEE", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Box sx={{ width: "20%", height: "10%", p : 3, bgcolor : "white", boxShadow : "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Box sx={{ width : "100%", height : "20%", borderBottom : "2px solid #FF5501", display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "column", mb : 3}}>
            <Typography variant="h5">ログイン</Typography>
          </Box>
          <GoogleLoginButton id={""} width="300px" />
        </Box>
      </Box>
  );
}

export default LoginPage;
