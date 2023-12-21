import { AppBar, Box, Toolbar, Container, Button} from '@mui/material/'
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import MyPage from './MyPage';
import MyButton from '../../common/button/ProfileButton';

function Header() {
  
  const [status, setStatus] = useState("ログイン");
  
  const Navigate = useNavigate();

  const login = () => {
    Navigate('/login');
  }

  const createReview = () => {
    Navigate('/review');
  }

  const logout = () => {
    alert('로그아웃이 완료되었습니다.');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('id');
    Navigate('/');
  }

  useEffect(() => {
    setStatus(window.localStorage.getItem('access_token') == null ? 'ログイン' : 'ログアウト');
  }, [window.localStorage.getItem('access_token')]);


  return (
    <AppBar color='default' position='sticky'>
      <Container maxWidth="lg">
        <Toolbar sx={{ display : "flex" }}>
          <Logo src="/tabeyoukaLogo.png"/>
          <Button onClick={createReview} style={{color: "black"}}>レビューを見る</Button>
          <Box sx={{ flexGrow : 1, display : "flex", justifyContent: "flex-end" }}>
            <Button onClick={(window.localStorage.getItem('access_token') == null) ? login : logout}>
              {status}
            </Button>
            <MyPage/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;