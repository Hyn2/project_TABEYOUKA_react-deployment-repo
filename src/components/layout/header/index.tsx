import { AppBar, Box, Toolbar, Container, Button} from '@mui/material/'
import Logo from './Logo';
import GNB from './GNB';
import TemporaryDrawer from './Drawer';
import { Link } from 'react-router-dom';

// const Navigate = useNavigate();
// onClick={() => {Navigate('/login')}}
function Header() {
  
  const logOut = () => {
    localStorage.setItem('isloggedin', '');
    // 페이지 새로고침
    window.location.reload();
  }
  
  const isLoggedIn = () => {return !!localStorage.getItem('isloggedin')};
  
  return (
    <AppBar color='default'>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Logo src="/tabeyoukaLogo.png"/>
          <GNB/>
            {isLoggedIn() ?
            ( <Button onClick={logOut} sx={{ color : "black" }}>로그아웃</Button> ) : ( <Button><Link to="/login" style={{ textDecoration : "none", color : "black" }}>로그인</Link></Button> ) }
          <Box sx={{ flexGrow: 0, display : "flex" }}>
            <TemporaryDrawer />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;