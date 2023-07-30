import { Typography } from "@mui/material";
import React from "react";

interface bioProps {
  children : React.ReactNode,
}

const Bio = ({children} : bioProps) => {
  return (
      <Typography variant="body2" sx={{my: "7px"}}>{children}</Typography>
  );
}

export default Bio;
