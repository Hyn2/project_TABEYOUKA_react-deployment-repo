import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Skeleton } from "@mui/material";
import CleanHandsOutlinedIcon from "@mui/icons-material/CleanHandsOutlined";
import { useNavigate } from "react-router-dom";

interface ActionCardProps {
  src: string;
  title: string;
  tag: string;
  id: string;
}

export default function ActionCard({ src, title, tag, id }: ActionCardProps) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 로딩시간을 위한 setTimeout
    const loadingDelay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingDelay);
  }, []);

  const navigating = () => {
    // 특정가게의 정보를 요청하여 이동
    const params = { id: id };
    const queryString = new URLSearchParams(params).toString();
    navigate(`/store?${queryString}`);
  };

  return (
    <Card
      onClick={navigating}
      sx={{
        width: 360,
        maxHeight: 440,
        mr: 1,
        mb: 1,
        ":hover": { boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" },
      }}
    >
      <CardActionArea>
        {loading ? (
          <Skeleton variant="rectangular" height={300} animation="wave" />
        ) : (
          <CardMedia component="img" height="300" image={src} />
        )}
        <CardContent>
          {loading ? (
            <Skeleton variant="text" height={60} animation="wave" />
          ) : (
            <Typography gutterBottom variant="h6" sx={{ height: "60px" }}>
              {title}
            </Typography>
          )}
          {loading ? (
            <Skeleton variant="text" height={20} animation="wave" />
          ) : (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {tag}
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CleanHandsOutlinedIcon sx={{ fontSize: "21px" }} />
            {loading ? (
              <Skeleton
                variant="text"
                height={20}
                width={100}
                animation="wave"
                sx={{ ml: 1 }}
              />
            ) : (
              <Typography variant="body1" color="text.secondary">
                감염 예방
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
