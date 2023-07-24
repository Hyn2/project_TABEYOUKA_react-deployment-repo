import { Box, Typography } from "@mui/material";
import GoogleLoginButton from "../components/socialLogin/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

function LoginPage() {
  return (
      <Box sx={{width: "100%", height: "1000px", bgcolor: "#EEEEEE", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Box sx={{ width: "20%", height: "10%", p : 3, bgcolor : "white", boxShadow : "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Box sx={{ width : "100%", height : "20%", borderBottom : "2px solid #FF5501", display: "flex", alignItems: "center", justifyContent: "flex-end", flexDirection: "column", mb : 3}}>
            <Typography variant="h5">ログイン</Typography>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID} data-auto_select={false} >
                <GoogleLoginButton id={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID} width="300px"/>
            </GoogleOAuthProvider>
          </Box>
        </Box>
      </Box>
  );
}

export default LoginPage;
