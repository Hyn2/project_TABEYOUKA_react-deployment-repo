import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';
import { useNavigate } from 'react-router-dom';

interface ActionCardProps {
  src : string;
  title : string;
  tag : string;
}


export default function ActionCard({src, title, tag} : ActionCardProps) {
  const navigate = useNavigate();
  const navigating = () => {
    // 특정가게의 정보를 요청하여 이동 (현재는 임시로 Info로 이동)
    navigate(`/store`)
  }

  return (
    <Card onClick={navigating} sx={{ maxWidth: 360, maxHeight : 420, mr : 1 , mb : 1, ":hover": { boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)'}}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={src}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {tag}
          </Typography>
          <Box sx={{ display : "flex", alignItems : "center"}}>
            <CleanHandsOutlinedIcon sx={{ fontSize : "21px" }} />
            <Typography variant="body1" color="text.secondary">감염 예방</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}