import { Box } from "@mui/material";

interface tabPanelProps {
  value : number,
  index : number,
  children : React.ReactNode,
}

const TabPanel = ({ value, index, children } : tabPanelProps) => {

  return (
    <Box sx={{height:"900px", padding: "1%"}} hidden={value !== index}>{children}</Box>
  );
}

export default TabPanel;