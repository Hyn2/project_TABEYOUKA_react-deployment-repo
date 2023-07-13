import { Button } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin, googleLogout, useGoogleOneTapLogin } from '@react-oauth/google'



interface props {
  id : string
  width : string
}

const GoogleLoginButton = ({id, width} : props) => {


  const handleLoginSuccess = (credentialResponse : any) => {
    console.log(credentialResponse) 
    console.log(credentialResponse.credential)
    
  };

  const onError = () => {
    console.log("error");
  };

  const logout = () => {
    googleLogout();
    console.log("googleLogout");
}

  
  
  return (
    <>     
      <GoogleOAuthProvider clientId={id} data-auto_select={false} >
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
      </GoogleOAuthProvider> 
        <Button onClick={logout}>로그아웃</Button>
    </>
  )
}

export default GoogleLoginButton;