import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import GoogleLoginButton from "../components/socialLogin/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

function LoginPage() {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    
      <Box sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(https://i.ibb.co/Hh51XCv/IMG-1122.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
        <Box sx={{
          marginBottom: "100px",
          width: isDownMD ? "70%" : "20%",
          height: "10%",
          p: 3,
          bgcolor: "white",
          color: "#1976D1",
          transition: "all 0.2s ease-in-out",
          borderRadius: "10px",
          "&:hover": {
            bgcolor: "#1976D1",
            color: "white",
            transition: "all 0.2s ease-in-out",
          },
        }}>
          <Box sx={{
            width: "100%",
            height: "100%",
            borderBottom : "2px solid #EA4435",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}>
          <Typography variant="h5" sx={{ paddingBottom: "5px", fontWeight: "bold"}}>ログイン</Typography>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID} data-auto_select={false} >
              <GoogleLoginButton/>
          </GoogleOAuthProvider>
          </Box>
        </Box>
      </Box>
  );
}

export default LoginPage;
