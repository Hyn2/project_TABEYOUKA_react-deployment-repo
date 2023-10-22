import { Avatar, Box, Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface storyProps {
  id: string,
  src : string,
  alt : string,
  title : string,
  onClick: () => void;
}

const avatarStyles = {
  height:"70px", 
  width: "70px", 
  border: "1px solid rgba(0,0,0,0.3)", 
  objectFit: "cover"
}

const Story = ({ onClick, src, alt, title} : storyProps) => {
  return (
    // <Box sx={{ position : 'relative', paddingTop : "15%", width: "15%" }}>
      <Card sx={{ width: "200px", margin: "2%"}}>
          <CardActionArea onClick={onClick}>
            <CardMedia
              component="img"
              height="140"
              image="/vite.svg"
              alt={alt}
            />
            <CardContent>
              <Typography gutterBottom variant="body1" component="div" >
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    // </Box>
    
  );
}

export default Story;

