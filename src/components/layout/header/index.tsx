import { AppBar, Box, Toolbar, Container, Button} from '@mui/material/'
import Logo from './Logo';
import GNB from './GNB';
import TemporaryDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';

function Header() {
  const [mode, setMode] = useState('Products');
  const [status, setStatus] = useState("ログイン");
  
  const Navigate = useNavigate();

  const login = () => {
    Navigate('/login');
  }

  const logout = () => {
    alert('로그아웃이 완료되었습니다.');
    window.localStorage.removeItem('id_token');
    Navigate('/');
  }

  useEffect(() => {
    setStatus(window.localStorage.getItem('id_token') == null ? 'ログイン' : 'ログアウト');
  }, [window.localStorage.getItem('id_token')]);

  const pages = [{key : 'Products', onClick :()=> {console.log("Products")}}, 
  {key : 'Pricing', onClick :()=> {console.log("Pricing")}}, 
  {key : 'Blog', onClick : ()=> {console.log("Blog")}}];

  return (
    <AppBar color='default'>
      <Container maxWidth="lg">
        <Toolbar >
          <Logo src="/tabeyoukaLogo.png"/>
          <GNB pages={pages} onClick={setMode}/>
          <Button onClick={(window.localStorage.getItem('id_token') == null) ? login : logout}>
            {status}
          </Button>
          <Box sx={{ flexGrow: 0, display : "flex" }}>
            <TemporaryDrawer />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;