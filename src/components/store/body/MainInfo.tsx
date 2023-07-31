import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import InformationTable from "../../ui/table";
import { Restaurant } from "../../../types/restaurant.interface";

type StoreDataType = {
  [key: string]: string;
};

interface StoreHeaderInfoProps {
  data: Restaurant;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};


export default function MainInfo({ data } : StoreHeaderInfoProps) {

  const center = {
    lat: data.lat,
    lng: data.lng,
  };

  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  const storeData: StoreDataType = {
    住所: data.address,
    アクセス: data.access,
    駐車場: data.parking,
    定休日: data.close,
    平均予算: `平均 ${data.budget?.name}`,
    ランチ: data.lunch,
    食べ放題: data.free_food,
    飲み放題: data.free_drink,
    支払方法: `カード${data.card}`,
  };

  const facility = {
    総席数: data.capacity,
    個室: data.private_room,
    畳: data.tatami,
    喫煙: data.non_smoking,
    お子様連れ: data.child,
    "ペット同伴": data.pet,
    "Wi-Fi" : data.wifi,
    "バリアフリー" : data.barrier_free,
  };

  return (
    <Box sx={{ width: isDownMD ? "100%" : "70%", height: "100%" }}>
      {/* 이미지 */}
      <Box sx={{ width : "100%", height : "300px"}}>
        <LoadScript googleMapsApiKey="">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            <MarkerF position={center} />
          </GoogleMap>
        </LoadScript>
      </Box>
      
      {/* 가게 상세 */}
      <InformationTable storeData={storeData} title="店舗詳細" />
      {/* 좌석 / 시설 정보 */}
      <InformationTable storeData={facility} title="席・設備情報" />
      <Box sx={{ width : "100%", height : "100px", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
        <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} sx={{ p : 2 }}>ページ上部へ戻る</Button>
      </Box>
    </Box>
  );
}