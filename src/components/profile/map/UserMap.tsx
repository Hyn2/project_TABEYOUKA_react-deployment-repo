import { useLoadScript } from "@react-google-maps/api"
import Map from "./Map"

interface userMapProps {
  userId : string
}


export default function UserMap({userId} : userMapProps) {
  const googleMapApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : googleMapApiKey,

  });
  if (!isLoaded) return <div>Loading</div>
  return <Map userId={userId}></Map>
}