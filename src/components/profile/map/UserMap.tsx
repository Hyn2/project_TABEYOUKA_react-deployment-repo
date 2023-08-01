import { useLoadScript } from "@react-google-maps/api"
import Map from "./Map"
import { Typography } from "@mui/material";

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
    <Typography sx={{my: "10px", textAlign : "center"}} variant="h5">レビューを作成したお店を確認</Typography>
    <Map userId={userId}></Map>
    </>
  )
}