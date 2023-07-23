import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



interface props {
  id : string
  width : string
}

const GoogleLoginButton = ({id, width} : props) => {
  const navigate = useNavigate();


  const handleLoginSuccess = (response : any) => {
    console.log(response);
    const idToken = response.credential;
    axios.post('http://localhost:8000/api/user', {
      idToken : idToken,
    })
    .then(() => {
      window.localStorage.setItem('id_token',idToken);
      console.log(window.localStorage.getItem('id_token'));
    })
    .then(() => {
      navigate('/');
    })
    .catch(error => {
      alert('다시 시도하세요');
      navigate('/login');
      return error;
    })
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
          <GoogleLogin size='large' width='450px'
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
      </GoogleOAuthProvider> 
    </>
  )
}

export default GoogleLoginButton;