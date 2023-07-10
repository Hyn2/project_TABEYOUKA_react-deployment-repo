import { Avatar, Box, ButtonBase, Typography } from "@mui/material";

interface categoryProps {
  src : string,
  alt : string,
  title : string,
}

const Category = ({src, alt, title} : categoryProps) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column"}}>
    <ButtonBase sx={{borderRadius: "100%", border: "1px solid grey"}}>
      <Avatar sx={{height:"70px", width: "70px", border: "1px solid rgba(0,0,0,0.3)", objectFit: "cover"}} src={src} alt={alt} />
    </ButtonBase>
    <Typography variant="caption" sx={{textAlign: "center"}}>{title}</Typography>
    </Box>
  );
}

export default Category;

