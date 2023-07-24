import { Box, Button } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



interface props {
  id : string
  width : string
}


const GoogleLoginButton = ({id, width} : props) => {
  const navigate = useNavigate();


//   const handleLoginSuccess = (response : any) => {
//     console.log(response.credential);
//     const idToken = response.credential;
//     axios.post('http://localhost:8000/api/user', {
//       idToken : idToken,
//     })
//     .then((response) => {
//       console.log(response);
//       const id = response.data;
//       window.localStorage.setItem('id_token',idToken);
//       window.localStorage.setItem('id', id);
//     })
//     .then(() => {
//       navigate('/');
//     })
//     .catch(error => {
//       console.error(error);
//       alert('다시 시도하세요');
//       navigate('/login');
//       return error;
//     })
//   };  
  
//   return (
//     <>     
//       <GoogleOAuthProvider clientId={id} data-auto_select={false} >
//           <GoogleLogin size='large' width='450px'
//             onSuccess={handleLoginSuccess}
//             onError={() => {
//               console.log('Login Failed');
//             }}
//           />
//       </GoogleOAuthProvider> 
//     </>
//   )
// }

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
        <Button onClick={googleSocialLogin}>Google Button</Button>
      </Box>
    </Box>
  );
};


export default GoogleLoginButton;