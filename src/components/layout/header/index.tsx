import { AppBar, Box, Toolbar, Container, Button} from '@mui/material/'
import Logo from './Logo';
import GNB from './GNB';
import TemporaryDrawer from './Drawer';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Header() {
  const [mode, setMode] = React.useState('Products');
  
  const Navigate = useNavigate();
  const login = () => {
    Navigate('/login');
  }
  const pages = [{key : 'Products', onClick :()=> {console.log("Products")}}, {key : 'Pricing', onClick :()=> {console.log("Pricing")}}, {key : 'Blog', onClick : ()=> {console.log("Blog")}}];
  return (
    <AppBar color='default'>
      <Container maxWidth="lg">
        <Toolbar >
          <Logo src="/tabeyoukaLogo.png"/>
          <GNB pages={pages} onClick={setMode}/>
          <Button onClick={login}>로그인</Button>
          <Box sx={{ flexGrow: 0, display : "flex" }}>
            <TemporaryDrawer />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;