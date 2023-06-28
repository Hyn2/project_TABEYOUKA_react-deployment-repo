


import { AppBar, Box, Toolbar, Container } from '@mui/material/'

import Logo from './Logo';
import GNB from './GNB';
import TemporaryDrawer from '../body/drawer/Drawer';
import BasicMenu from './basicMenu';


function Header() {
  return (
    <AppBar color='default' position='relative'>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Logo src="/tabeyoukaLogo.png"/>
          <GNB/>
          <Box sx={{ flexGrow: 0, display : "flex" }}>
            <BasicMenu />
            <TemporaryDrawer />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;