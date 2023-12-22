import { Box } from "@mui/material";
import MainInfo from "./MainInfo"
import SideInfo from "./SideInfo";
import { memo } from "react";
import { StoreHeaderInfoProps } from "../../../types/restaurant.interface";

const BodyInfo = memo(({ data } : StoreHeaderInfoProps) => {
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
});

export default BodyInfo;