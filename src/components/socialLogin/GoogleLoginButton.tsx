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


  
  
  return (
    <>     
      <GoogleOAuthProvider clientId={id} data-auto_select={false} >
          <GoogleLogin
            width={width}
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