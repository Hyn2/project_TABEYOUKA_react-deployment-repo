import { Typography } from "@mui/material";

interface tabPanelProps {
  value : number,
  index : number,
  children : React.ReactNode,
}

const TabPanel = ({ value, index, children } : tabPanelProps) => {

  return (
    <Typography hidden={value !== index}>{children}</Typography>
  );
}

export default TabPanel;