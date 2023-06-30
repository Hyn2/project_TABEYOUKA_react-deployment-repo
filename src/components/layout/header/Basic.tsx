import * as React from 'react';
import { IconButton, Menu, MenuItem} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}>
        <LanguageIcon></LanguageIcon>
      </IconButton>   
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>한국어</MenuItem>
        <MenuItem onClick={handleClose}>日本語</MenuItem>
        <MenuItem onClick={handleClose}>English</MenuItem>
      </Menu>
    </div>
  );
}

export default BasicMenu;