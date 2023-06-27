import { Box, Drawer, IconButton, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const data = [
  { name: "About Us",},
  { name: "TABEYOUKA에 관하여",},
  { name: "FAQs",},
  { name: "Privacy Policy",},
];

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem key={index} sx={{ p : "14px 16px 14px 16px", borderBottom : "0.5px #C2C2C2 solid" }}>
          <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: "14px", fontWeight: "300" }} />
        </ListItem>
      ))}
    </Box>
  );
  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon></MenuIcon>
      </IconButton>
      <Drawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
        <Box sx={{ width : "100%", height : "7%" }}></Box>
        {getList()}
      </Drawer>
    </Box>

    
  );
}

export default TemporaryDrawer;