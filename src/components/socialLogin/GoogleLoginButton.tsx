import { Box, Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code }) => {
      axios
        .post("http://localhost:8000/api/user", { code })
        .then(({ data }) => {
          window.localStorage.setItem('id', data['id']);
          window.localStorage.setItem('access_token', data['access_token']);
          window.localStorage.setItem('refresh_token', data['refresh_token']);
        })
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error(error);
          alert('다시 시도하세요');
          navigate('/login');
          return error;
        })
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  return (
    <Box>
      <Box>
        <Button  sx={{ backgroundSize: 'cover', backgroundPosition: 'center', width : '190px', height: '45px', backgroundImage: "url('/public/btn_google_signin_light_normal_web@2x.png')"}} onClick={googleSocialLogin} />
      </Box>
    </Box>
  );
};


export default GoogleLoginButton;