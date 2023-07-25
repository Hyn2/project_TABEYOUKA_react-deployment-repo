import { Box, Button, Modal, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import type { UseToggle } from "../../../types/hooks.interface";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import type { Restaurant } from "../../../types/restaurant.interface";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  bgcolor: "#EEEEEE",
};

const mapContainerStyle = {
  width: "100%",
  height: "85%", // Reduced height to make space for the restaurant info box below
};

const center = {
  lat: 35.6803997,
  lng: 139.7690174,
};

export default function MapModal(props: Omit<UseToggle, "setTrue"> & { restaurants: Restaurant[] }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  console.log(props.restaurants)
  return (
    <Modal open={props.value} onClose={props.setFalse} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <Box sx={modalStyle}>
          <LoadScript googleMapsApiKey="" onLoad={() => setIsMapLoaded(true)}>
            {isMapLoaded && (
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
                {props.restaurants.map((restaurant) => (
                  <MarkerF key={restaurant.id} position={{ lat: restaurant.lat, lng: restaurant.lng }} />
                ))}
              </GoogleMap>
            )}
          </LoadScript>
          <Box
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
            {props.restaurants.map((restaurant) => (
              <Box
                key={restaurant.id}
                sx={{
                  p : 1,
                  bgcolor : "white",
                  flex: "1", // Adjust the flex property to automatically distribute the width
                  minWidth: "260px", // Limit the maximum width for each restaurant info box
                  height: "120px",
                  display: "flex", // Add display flex to allow image and text to be side by side
                  alignItems: "center", // Align image and text vertically
                  mr : 1,
                  boxShadow: 0, // Set initial boxShadow value to 0
                  "&:hover": {
                    boxShadow: 24,
                    transition: "box-shadow 0.4s ease-in-out", // Only apply transition to the boxShadow property
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
                  <Typography variant="subtitle1" sx={{ lineHeight : 1.1, fontWeight : "bold", mb : 1 }}>{restaurant.name}</Typography>
                  <Typography variant="subtitle1" sx={{ color : "#C2C2C2" }}>{restaurant.genre.name}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}