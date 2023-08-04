import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import Layout from "../components/layout";
import useToggle from "../hooks/useToggle";
import { LocationModal, CategoryModal, RestaurantModal, MapModal} from "../components/ui/modal";
import ActionCard from "../components/ui/actionCard/infoCard";
import {LocationOnOutlined, DiningOutlined, Search, MapOutlined} from "@mui/icons-material";
import {useLayoutEffect, useState, useRef, useEffect} from "react";
import searchRestaurant from "../api/search";
import type {Restaurant} from ".././types/restaurant.interface.ts";
import ReSearchModalButton from "../components/common/button/ReSearchModalButton.tsx";
import { useNavigate } from "react-router-dom";


function SearchResultPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

  const target = useRef<HTMLDivElement | null>(null);
  const [fetchingData, setFetchingData] = useState(false);
  
  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !fetchingData) {
        setFetchingData(true);
        setParams((prevParams) => ({ ...prevParams, start: prevParams.start + 10 }));
        console.log(params.start);
      }
    });
  };

  useLayoutEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (target.current) {
      const options = {
        threshold: 1.0,
      };
      observer = new IntersectionObserver(callback, options);
      observer.observe(target.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [fetchingData]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const { setTrue: locationModalOpen, ...locationModalProps } = useToggle();
  const { setTrue: restaurantModalOpen, ...restaurantModalProps } = useToggle();
  const { setTrue: categoryModalOpen, ...categoryModalProps } = useToggle();
  const { setTrue: MapModalOpen, ...MapModalProps } = useToggle();
  
  
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [location, setLocation] = useState<string>("エリア");
  const [category, setCategory] = useState<string>("料理ジャンル");
  const [restaurant, setRestaurant] = useState<string>("");
  const [data, setData] = useState<Restaurant[]>([]);
  const [available, setAvailable] = useState<number>(0);
  const [params, setParams] = useState({
    genre: `${urlParams.get("genre")}`,
    area: `${urlParams.get("area")}`,
    name: `${urlParams.get("name")}`,
    lat: `${urlParams.get("lat")}`,
    lng: `${urlParams.get("lng")}`,
    start: 1,
    count: 10,
  });
  const [locationCode, setLocationCode] = useState<string>(`${params.area}`);
  const [categoryCode, setCategoryCode] = useState<string>(`${params.genre}`);

  if (params.genre !== categoryCode) {
    setParams({ ...params, genre: categoryCode });
  }
  if (params.area !== locationCode) {
    setParams({ ...params, area: locationCode });
  }

  // lat 혹은 lng가 변경되면 params에 반영 하지만 number를 string으로 변환해야함
  useEffect(() => {
    setParams({ ...params, lat: `${lat}`, lng: `${lng}` });
  }, [lat]);

  useEffect(() => {
    setParams({ ...params, name: restaurant });
  }, [restaurant]);
  
  
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        const fetchedData = await searchRestaurant(params);
        setData((prevData) => [...prevData, ...fetchedData]);
      } catch (e) {
        console.log(e);
        // 비동기 처리 완료시 false로 변경
      } finally {
        setFetchingData(false);
      }
    };
  
    fetchData();
  }, [params.start]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await searchRestaurant(params);
        setData(fetchedData);
        const available = await searchRestaurant({...params, count : 100});
        setAvailable(available);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [params.genre, params.area, params.name]);

  useLayoutEffect(() => {
    locationModalProps.setFalse();
  }, [location])
  return (
      <Box sx={{ height: "auto", pt: 9 }}>
        <Container maxWidth="lg" sx={{ height: isDownMD ? "auto" : "130px" }}>
          <Box
            sx={{
              width: "100%",
              height: "90%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ width: "90%", height: "34%", p: 1, display: "flex", flexDirection : isDownMD ? "column" : "row" }}>
                <ReSearchModalButton
                  Icon={LocationOnOutlined}
                  iconColor="green"
                  word={location}
                  modalOpen={locationModalOpen}
                >
                  <LocationModal
                    {...locationModalProps}
                    setLocation={setLocation}
                    setLocationCode={setLocationCode}
                    setLat={setLat}
                    setLng={setLng}
                  />
                </ReSearchModalButton>     
                <ReSearchModalButton
                  Icon={DiningOutlined}
                  iconColor="orange"
                  word={category}
                  modalOpen={categoryModalOpen}
                >
                  <CategoryModal
                    {...categoryModalProps}
                    setCategory={setCategory}
                    setCategoryCode={setCategoryCode}
                  />
                </ReSearchModalButton>
                <ReSearchModalButton
                    Icon={Search}
                    iconColor="skyblue"
                    word={restaurant}
                    modalOpen={restaurantModalOpen}
                >
                  <RestaurantModal
                    {...restaurantModalProps}
                    setRestaurant={setRestaurant}
                    purpose="restaurant"
                  />
                </ReSearchModalButton>
            </Box>

            <Box sx={{ width: "100%", height: "22%", p: 1, display: "flex" }}>
              <Box sx={{ width: "14%", height: "100%" }}>
                <Box
                  sx={{
                    width: "40%",
                    height: "100%",
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* 건수 데이터로 변경해야함 */}
                  <Typography sx={{ fontWeight: "bold" }}>
                    {available}
                  </Typography>
                  <Typography>件</Typography>
                </Box>
              </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    ml: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button sx={{ minWidth: "10px" }} onClick={MapModalOpen}>
                    <MapOutlined htmlColor="black" />
                  </Button>
                  <MapModal {...MapModalProps}  />
                </Box>
            </Box>
          </Box>
        </Container>

        <Container
          maxWidth="lg"
          sx={{
            height: "auto",
            display: "flex",
            justifyContent: isDownMD ? "center" : "flex-start",
            flexWrap: "wrap",
            alignContent: "center",
          }}
        >
          {(data && data.length) === 0 ? (
            <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography>検索結果がございません。</Typography>
              <Button onClick={() => {navigate(-1)}}>新たに検索する！</Button>
            </Box>
          ) : (
            <>
            {data && data.map((item: any, index: any) => (
              <ActionCard
                key={index}
                src={item.photo.pc.l}
                title={item.name}
                tag={`${item.small_area.name} / ${item.genre.name}`}
                id={item.id}
                
              />
            ))}
            {data && data.length >= 10 && (
              <div style={{ height : "50px", backgroundColor : "red" }} ref={target}></div>
            )}
            </>
          )}
        </Container>
      </Box>
  );
}

export default SearchResultPage;