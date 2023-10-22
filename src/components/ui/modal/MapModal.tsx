import { Box, Button, Modal, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Close, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import type { UseToggle } from "../../../types/hooks.interface";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import type { Restaurant } from "../../../types/restaurant.interface";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchRestaurant from "../../../api/search";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "85%",
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const mapContainerStyle = {
  width: "100%",
  height: "85%",
};

const center = {
  lat: 35.6803997,
  lng: 139.7690174,
};

export default function MapModal(props: Omit<UseToggle, "setTrue">) {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [data, setData] = useState<Restaurant[]>([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [params, setParams] = useState({
    genre: `${urlParams.get("genre")}`,
    area: `${urlParams.get("area")}`,
    name: `${urlParams.get("name")}`,
    lat: `${urlParams.get("lat")}`,
    lng: `${urlParams.get("lng")}`,
    start: 1,
    count: 20,
  });

  const Navigate = useNavigate();
  const navStore = (id : string) => {
    const params = { id: id };
    const queryString = new URLSearchParams(params).toString();
    Navigate(`/store?${queryString}`);
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await searchRestaurant(params);
        setData(fetchedData);
        console.log(fetchedData)
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [params.start]);

  const onClickNext = () => {
    setParams({ ...params, start: params.start + 20 });
    const container = document.getElementById("restaurant-container");
    if (container) {
      container.scrollLeft = 0;
    }
  };

  const onClickPrev = () => {
    setParams({ ...params, start: params.start - 20 });
  };


  return (
    <Modal open={props.value} onClose={props.setFalse} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems : "center", height: "100%"}}>
        <Typography variant="h6" textAlign={"center"} sx={{ mt: isDownMD ? 4 : 2, color : "white", fontWeight : "normal" }}>
            地図
        </Typography>
        <Button 
        onClick={props.setFalse}
        sx={{
          position: "absolute",
          right: isDownMD ? "7%" : "24%",
          top: isDownMD ? "3%" : "2%"}}>
          <Close htmlColor="white" />
        </Button>
        <Box sx={modalStyle}>
          <LoadScript googleMapsApiKey="" onLoad={() => setIsMapLoaded(true)}>
            {isMapLoaded && (
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
                {data.map((restaurant) => (
                  <MarkerF key={restaurant.id} position={{ lat: restaurant.lat, lng: restaurant.lng }} />
                ))}
              </GoogleMap>
            )}
          </LoadScript>
          <Box
            id="restaurant-container"
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "15%",
              bgcolor: "#F1F1F1",
              display: "flex",
              padding: "10px 0",
              overflow: "auto",
              
              p : 2
            }}
          >
            <Button onClick={onClickPrev} sx={{ bgcolor : "white", minWidth : "60px", height : "120px", p : 1, mr : 1, flexDirection : "column", display : params.start < 10 ? "none" : "flex" }}>
              <ArrowBackIosNew htmlColor="#E40301"/>
              <Typography sx={{ color : "black", fontSize : "11px", mt : 2 }}>前の20件</Typography>
            </Button>
            {data.map((restaurant) => (
              <Button
                key={restaurant.id}
                onClick={() => navStore(restaurant.id)}
                sx={{
                  p : 1,
                  bgcolor : "white",
                  flex: "1",
                  maxWidth: "300px",
                  minWidth: "300px",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  mr : 1,
                  boxShadow: 0,
                  "&:hover": {
                    boxShadow: 24,
                    transition: "box-shadow 0.4s ease-in-out",
                  },
                  "&:not(:hover)": {
                    boxShadow: 0,
                    transition: "box-shadow 0.4s ease-in-out",
                  },
                }}
              >
                <Box sx={{ width: "50%", height: "100%", mr : 2 }}>
                  <img src={restaurant.photo.pc.l} alt="Restaurant" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
                <Box sx={{ width: "50%", height: "100%"}}>
                  <Typography variant="subtitle1" sx={{ lineHeight : 1.1, fontWeight : "bold", mb : 0.3 }}>{restaurant.name}</Typography>
                  <Typography variant="subtitle1" sx={{ color : "#C2C2C2" }}>{restaurant.genre.name}</Typography>
                </Box>
              </Button>
            ))}
              <Button onClick={onClickNext} sx={{ bgcolor : "white", minWidth : "60px", height : "120px", p : 1, mr : 3, flexDirection : "column", display : data.length >= 19 ? "flex" : "none" }}>
               <ArrowForwardIos htmlColor="#E40301"/>
               <Typography sx={{ color : "black", fontSize : "11px", mt : 2 }}>次の20件</Typography>
              </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}