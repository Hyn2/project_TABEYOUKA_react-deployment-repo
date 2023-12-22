import { CreditCard, MoreVert, Wifi } from "@mui/icons-material";
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import BasicInfo from "./BasicInfo";
import { StoreHeaderInfoProps } from "../../../types/restaurant.interface";

const HeaderInfo = memo(({ data } : StoreHeaderInfoProps) => {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  return (
      <Container maxWidth="lg" sx={{ height: isDownMD ? "600px" : "100%", py: 5 }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignContent: "center",
          }}
        >
          <Box sx={{ width: "100%", height: "100%" }}>
            <Typography>{data.name_kana}</Typography>
            <Typography variant="h4">{data.name}</Typography>
            <Box
              sx={{ width: "100%", display: "flex", my: 2, color: "red" }}
            >
              {data.card === "利用可" ? (
                <Box sx={{ display: "flex" }}>
                <CreditCard />
                <Typography>カード</Typography>
                <MoreVert />
              </Box>
              ) : null}
              {data.wifi === "あり" ? (
                <Box sx={{ display: "flex" }}>
                <Wifi />
                <Typography>WI-FI</Typography>
                <MoreVert />
              </Box>
              ) : null}
            </Box>
            <Box sx={{
              width: "100%",
              height: "240px",
              display: "flex",
              flexDirection: isDownMD ? "column" : "row",
              alignItems: isDownMD ? "center" : "flex-start"
            }}>
              <Box sx={{ width: "248px", height: "100%"}}>
                {data && data.photo && data.photo.pc && (
                  <img src={data.photo.pc.l} alt="store" />
                )}
              </Box>
              <Box sx={{ width: isDownMD ? "100%" : "60%", height: "80%", ml: 3 }}>
                <BasicInfo data={data} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
  );
});

export default HeaderInfo;