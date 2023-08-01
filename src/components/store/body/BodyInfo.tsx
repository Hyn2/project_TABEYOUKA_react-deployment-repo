import { Box } from "@mui/material";
import MainInfo from "./MainInfo"
import SideInfo from "./SideInfo";
import { Restaurant } from "../../../types/restaurant.interface";

interface StoreHeaderInfoProps {
  data: Restaurant;
}

export default function BodyInfo({ data } : StoreHeaderInfoProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignContent: "center",
      }}
    >
      <MainInfo data={data} />
      <SideInfo data={data} />
    </Box>
  );
}