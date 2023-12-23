import { useLoadScript } from "@react-google-maps/api"
import Map from "./Map"
import { Box, Typography } from "@mui/material";

interface userMapProps {
  userId : string
}


export default function UserMap({userId} : userMapProps) {
  const googleMapApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : googleMapApiKey,

  });
  if (!isLoaded) return <div>Loading</div>
  return ( 
    <>
      <Box sx={{height: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Box sx={{width : "80%", justifyContent: "center", textAlign : "center", marginTop : "1%", marginBottom: "0.5%"}}>
          <Typography sx={{my: "10px"}} variant="h4">レビューを残したお店</Typography>
          <Typography sx={{my: "20px"}} variant="body1">今までレビューを残したお店を確認したり、その店のロケーションや詳しい情報まで見られる！</Typography>
        </Box>
        <Box sx={{width: "90%", height: "60%", boxShadow: "10"}}>
          <Map userId={userId}></Map>
        </Box>
      </Box>
    </>
  )
}