import axios from 'axios';
import './App.css'

import DynamicRouter from './Router'
import Layout from './components/layout'


function App() : JSX.Element {
  const refreshUserToken = () => {
    axios.post('https://oauth2.googleapis.com/token', {
      'client_id': import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
      'client_secret' : import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_SECRET,
      'grant_type' : "refresh_token",
      'refresh_token' : window.localStorage.getItem('refresh_token'),
    })
    .then(response => {
      window.localStorage.removeItem('access_token');
      window.localStorage.setItem('access_token', response.data.access_token);
    })
  };
  if(window.localStorage.getItem('refresh_token')) {
    setInterval(refreshUserToken, 15 * 1000); 
  }
    
  return (
    <Layout>
      <DynamicRouter />
    </Layout>    
  )
}

export default App
