import { Button } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';


interface props {
  id : string
  width : string
}

const GoogleLoginButton = ({id, width} : props) => {

  const handleLoginSuccess = (credentialResponse : any) => {
      localStorage.setItem('isloggedin', 'true');
      // 페이지 새로고침
      Navigate('/main');
      window.location.reload();
  };

  const onError = (error : any) => {
    console.log(error);
  };
  
  const Navigate = useNavigate();
  return (
      
      <GoogleOAuthProvider clientId={id}>
        <Button>
          <GoogleLogin onSuccess={handleLoginSuccess} onError={onError as any} width={width} />
        </Button>
      </GoogleOAuthProvider> 
    
  )
}

export default GoogleLoginButton;