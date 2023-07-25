import { Box, Button, Container, Typography } from "@mui/material";
import Layout from "../components/layout";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Wifi, CreditCard, MoreVert, DinnerDining, CurrencyYen, AccessTime, LocationOn } from "@mui/icons-material";
import { useLayoutEffect, useRef, useState } from "react";
import InformationTable from "../components/ui/table";
import { useNavigate } from 'react-router-dom';
import getRestaurant from "../api/getRestaurant.ts";
import type { Restaurant } from "../types/restaurant.interface.ts";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

type StoreDataType = {
  [key: string]: string;
};

const mainTypoBoxStyle = {
  width : "100%", height : "30px", display : "flex", alignItems : "center"
}

const mainTypoStyle = {
  fontSize: "19px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};



function store() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  
  const targetElement = useRef<HTMLDivElement>(null);
  
  const [data , setData] = useState<Restaurant>({} as Restaurant);
  const [storeData , setStoreData] = useState<StoreDataType>({} as StoreDataType);
  const [facility , setFacility] = useState<StoreDataType>({} as StoreDataType);

  const center = {
    lat: data.lat,
    lng: data.lng,
  };

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurant(id);
        console.log(data);
        setData(data);
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
        setStoreData(storeData);
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
        setFacility(facility);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  const handleClick = () => {
    if (targetElement.current) {
      targetElement.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  

  return (
      <Layout>
        <Box sx={{ height : "auto", pt : 9 }}>
          <Box sx={{ width : "100%", height : "30px", borderBottom : "#C2C2C2 1px dashed" }}>
            <Container maxWidth="lg" sx={{ height : "100%" }}>
              <Button onClick={goback} sx={{ width : "100%", height : "30px", display : "flex", justifyContent : "flex-start" , py : 1, pl : 0 }}>
                <ArrowCircleLeftIcon htmlColor="skyblue" />
                <Typography sx={{ fontSize : "16px" }}>검색 결과 다시 보기</Typography>
              </Button>
            </Container>
          </Box>

        <Box
          sx={{
            width: "100%",
            height: "450px",
            borderBottom: "#C2C2C2 1px solid",
          }}
        >
          <Container maxWidth="lg" sx={{ height: "100%", py: 5 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <Box sx={{ width: "75%", height: "100%" }}>
                <Typography>{data.name_kana}</Typography>
                <Typography variant="h4">{data.name}</Typography>
                <Box
                  sx={{ width: "100%", display: "flex", my: 2, color: "red" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <CreditCard />
                    <Typography>カード</Typography>
                    <MoreVert />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Wifi />
                    <Typography>WI-FI</Typography>
                    <MoreVert />
                  </Box>
                </Box>
                <Box sx={{ width: "100%", height: "240px", display: "flex" }}>
                  <Box sx={{ width: "248px", height: "100%"}}>
                    {data && data.photo && data.photo.pc && (
                      <img src={data.photo.pc.l} alt="store" />
                    )}
                  </Box>
                  <Box sx={{ width: "60%", height: "80%", ml: 3 }}>
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
              {/* TripAdvisor 리뷰가 들어갈 자리 (필수인지 아닌지는 모르겠음) */}
              <Box sx={{ width: "25%", height: "100%" }}></Box>
            </Box>
          </Container>
        </Box>
        
        {/* 가게 상세 */}
        <Box
          sx={{
            width: "100%",
            height: "auto",
            borderBottom: "#C2C2C2 1px solid",
            bgcolor: "#F7F5EF",
            pt: 5,
          }}
        >
          <Container maxWidth="lg" sx={{ height: "auto" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <Box sx={{ width: "70%", height: "100%" }}>
                {/* 이미지 */}
                <Box sx={{ width : "100%", height : "300px", bgcolor : "red"}}>
                  <LoadScript googleMapsApiKey="">
                    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                      <MarkerF position={center} />
                    </GoogleMap>
                  </LoadScript>
                </Box>
                
                {/* 가게 상세 */}
                <InformationTable storeData={storeData} title="店舗詳細" />
                {/* 좌석 / 시설 정보 */}
                <InformationTable
                  storeData={facility}
                  title="席・設備情報"
                />
              </Box>
              <Box sx={{ width: "30%", height: "100%", ml: 4 }}>
                <Box sx={{ width: "100%", height: "auto" }}>
                  <Box sx={{ width: "96%", height: "5%", p: 2 }}>
                    <Typography variant="h5">基本情報</Typography>
                  </Box>
                  <Box sx={{ width: "60%", height: "auto", bgcolor: "#EEECE2", p : 2 }}>
                    <Typography sx={{ fontSize : "14px", fontWeight : "bold" }}>・ 営業時間</Typography>
                    <Typography sx={{ fontSize : "12px", px : 1 }}>{data.open}</Typography>
                    <Typography sx={{ fontSize : "14px", fontWeight : "bold" }}>・ 定休日</Typography>
                    <Typography sx={{ fontSize : "12px", px : 1 }}>{data.close}</Typography>
                    <Typography sx={{ fontSize : "14px", fontWeight : "bold" }}>・ 平均予算</Typography>
                    <Typography sx={{ fontSize : "12px", px : 1 }}>{`平均 ${data.budget?.name}`}</Typography>
                  </Box>
                </Box>
                <Box sx={{ width: "100%", height: "auto" }}>
                  <Box sx={{ width: "96%", height: "5%", p: 2 }}>
                    <Typography variant="h5">サービス情報</Typography>
                  </Box>
                  <Box sx={{ width: "60%", height: "auto", bgcolor: "#EEECE2", p : 2 }}>
                    <Typography sx={{ fontSize : "14px" }}>英語メニュー : {data.english}</Typography>
                    <Typography sx={{ fontSize : "14px" }}>食べ放題 : {data.free_food}</Typography>
                    <Typography sx={{ fontSize : "14px" }}>飲み放題 : {data.free_drink}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          </Box>
        </Box>
      </Layout>
  )
}

export default store;
