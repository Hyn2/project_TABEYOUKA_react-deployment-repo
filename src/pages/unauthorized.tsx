import { Box, Button, Typography } from "@mui/material";
import Layout from "../components/layout";
import { useNavigate } from "react-router-dom";

function unauthorized() {
  const navigate = useNavigate();
  const redirectToLoginPage = () => {
    window.localStorage.removeItem('id_token');
    navigate('/login');
  }
    return (
        <Layout>
            <Box sx={{ width : "100%", height : "950px", bgcolor : "#EEEEEE", display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column"}}>
              <Box sx={{ width : "20%", height : "10%", display : "flex", justifyContent : "center", alignItems : "center", flexDirection: "column"  }}>
                <Box></Box>
                <Typography variant="h1">401</Typography>
                <Typography variant="h2">UNAUTHORIZED</Typography>
                <Button onClick={redirectToLoginPage}>로그인 페이지로 이동하기</Button>
              </Box>
            </Box>
        </Layout>
    )
}

export default unauthorized;