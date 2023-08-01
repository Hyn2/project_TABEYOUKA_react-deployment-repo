import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Restaurant } from "../../../types/restaurant.interface";

interface StoreHeaderInfoProps {
  data: Restaurant;
}

export default function SideInfo({ data } : StoreHeaderInfoProps) {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ width: "30%", height: "100%", ml: 4, display: isDownMD ? "none" : "block" }}>
      <Box sx={{ width: "100%", height: "auto" }}>
        <Box sx={{ width: "96%", height: "5%", p: 2 }}>
          <Typography variant="h5">基本情報</Typography>
        </Box>
        <Box sx={{ width: "60%", height: "auto", bgcolor: "#EEECE2", p : 2 }}>
          <Typography sx={{ fontSize : "14px", fontWeight : "bold" }}>・ 営業時間</Typography>
          <Typography sx={{ fontSize : "12px", px : 1 }}>{data.open}</Typography>
          <Typography sx={{ fontSize : "14px", fontWeight : "bold" }}>・ 定休日</Typography>
          <Typography sx={{ fontSize : "12px", px : 1 }}>{data.close}</Typography>
          <Typography sx={{ fontSize : "14px", fontWeight : "bold" }}>・ 平均予算</Typography>
          <Typography sx={{ fontSize : "12px", px : 1 }}>{`平均 ${data.budget?.name}`}</Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", height: "auto" }}>
        <Box sx={{ width: "96%", height: "5%", p: 2 }}>
          <Typography variant="h5">サービス情報</Typography>
        </Box>
        <Box sx={{ width: "60%", height: "auto", bgcolor: "#EEECE2", p : 2 }}>
          <Typography sx={{ fontSize : "14px" }}>英語メニュー : {data.english}</Typography>
          <Typography sx={{ fontSize : "14px" }}>食べ放題 : {data.free_food}</Typography>
          <Typography sx={{ fontSize : "14px" }}>飲み放題 : {data.free_drink}</Typography>
        </Box>
      </Box>
    </Box>
  );
}