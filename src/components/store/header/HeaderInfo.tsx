import { AccessTime, CreditCard, CurrencyYen, DinnerDining, LocationOn, MoreVert, Wifi } from "@mui/icons-material";
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRef } from "react";
import type { Restaurant } from "../../../types/restaurant.interface";

const mainTypoBoxStyle = {
  width : "100%", height : "30px", display : "flex", alignItems : "center"
}

const mainTypoStyle = {
  fontSize: "19px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
}

interface StoreHeaderInfoProps {
  data: Restaurant;
}


export default function HeaderInfo({ data } : StoreHeaderInfoProps) {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const targetElement = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (targetElement.current) {
      targetElement.current.scrollIntoView({ behavior: "smooth" });
    }
  };
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
                <Box sx={{ ...mainTypoBoxStyle }}>
                  <DinnerDining />
                  <Typography sx={{ ...mainTypoStyle }}>
                    {data.genre?.name}
                  </Typography>
                </Box>
                <Box sx={{ ...mainTypoBoxStyle }}>
                  <CurrencyYen />
                  <Typography sx={{ ...mainTypoStyle }}>
                    {`平均 ${data.budget?.name}`}
                  </Typography>
                </Box>
                <Box sx={{ ...mainTypoBoxStyle }}>
                  <AccessTime />
                  <Typography sx={{ ...mainTypoStyle }}>
                    {data.open}
                  </Typography>
                </Box>
                <Box sx={{ ...mainTypoBoxStyle }}>
                  <LocationOn />
                  <Typography sx={{ ...mainTypoStyle }}>
                    {data.access}
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", height: "20%", py: 1 }}>
                  <Button onClick={handleClick}>점포 상세</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
  );
}