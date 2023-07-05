import { Box, Typography } from "@mui/material";
import React from "react";

interface bioProps {
  children : React.ReactNode,
}

const Bio = ({children} : bioProps) => {
  return (
    <Box>
      <Typography variant="body2" sx={{my: "7px"}}>{children}</Typography>
    </Box>
  );
}

export default Bio;
