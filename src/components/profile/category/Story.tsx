import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

interface storyProps {
  id: string,
  src : string,
  alt : string,
  title : string,
  onClick: () => void;
}

const Story = ({ onClick, alt, title} : storyProps) => {
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

