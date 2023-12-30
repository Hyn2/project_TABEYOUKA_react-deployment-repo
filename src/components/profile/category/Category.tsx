import {ButtonBase, Box, Typography} from "@mui/material";

interface storyProps {
  id: string,
  src : string,
  title : string,
  onClick: () => void;
}

const Category = ({onClick, src, title} : storyProps) => {
  return (
    <ButtonBase onClick={onClick} sx={{padding: "3%", justifyContent: "flex-start"}}>
      <Box sx={{flexBasis: "20%", height: "100%"}}>
        <img style={{width: "100%", height: "100%", objectFit: "fill"}} src={src} alt="review_image" />
      </Box>
      <Typography sx={{ml : "5%"}}>{title}</Typography>
    </ButtonBase>
  );
}

export default Category;

