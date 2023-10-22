import { Typography, useMediaQuery } from "@mui/material";
import React from "react";

interface bioProps {
  children : React.ReactNode,
}

const Bio = ({children} : bioProps) => {
  const mobileScreenFontSize = useMediaQuery('(max-width: 1210px)');
  return (
      <Typography variant="caption" sx={{my: "7px", fontSize: mobileScreenFontSize ? "40%" : "100%"}}>{children}</Typography>
  );
}

export default Bio;
