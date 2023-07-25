import { Box, Button, Container, Typography } from "@mui/material";
import Layout from "../components/layout";
import useToggle from "../hooks/useToggle";
import { LocationModal, CategoryModal, RestaurantModal, MapModal} from "../components/ui/modal";
import ActionCard from "../components/ui/actionCard/infoCard";
import {LocationOnOutlined, DiningOutlined, Search, MapOutlined} from "@mui/icons-material";
import {useLayoutEffect, useState, useRef} from "react";
import searchRestaurant from "../api/search";
import type {Restaurant} from ".././types/restaurant.interface.ts";


function SearchResultPage() {
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
    let observer: IntersectionObserver | null = null; // Declare the observer variable

    if (target.current) {
      const options = {
        threshold: 1.0,
      };
      observer = new IntersectionObserver(callback, options);
      observer.observe(target.current);
    }

    return () => {
      // Clean up the observer
      if (observer) {
        observer.disconnect();
      }
    };
  }, [fetchingData]); // Add fetchingData to the dependencies

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const { setTrue: locationModalOpen, ...locationModalProps } = useToggle();
  const { setTrue: restaurantModalOpen, ...restaurantModalProps } = useToggle();
  const { setTrue: categoryModalOpen, ...categoryModalProps } = useToggle();
  const { setTrue: MapModalOpen, ...MapModalProps } = useToggle();
  
  
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [location, setLocation] = useState<string>("위치");
  const [category, setCategory] = useState<string>("요리 장르");
  const [restaurant, setRestaurant] = useState<string>("레스토랑 이름");
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
  
  useLayoutEffect(() => {
    // fetchData 함수 정의
    const fetchData = async () => {
      try {
        const fetchedData = await searchRestaurant(params);
        setData((prevData) => [...prevData, ...fetchedData]);
        setFetchingData(false);
      } catch (e) {
        console.log(e);
        setFetchingData(false);
      }
    };

    fetchData();
    
  }, [params.genre, params.area, params.name, params.start ]);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const available = await searchRestaurant({...params, count : 100});
        setAvailable(available);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    
  }, []);
  useLayoutEffect(() => {
    locationModalProps.setFalse();
  }, [location])
  return (
    <Layout>
      <Box sx={{ height: "auto", pt: 9 }}>
        <Container maxWidth="lg" sx={{ height: "130px" }}>
          <Box
            sx={{
              width: "100%",
              height: "90%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ width: "100%", height: "34%", p: 1, display: "flex" }}>
              <Box sx={{ width: "50%", height: "100%", display: "flex" }}>
                {/* 아래 3개의 버튼 중복성이 느껴져서 리펙토링 예정 */}
                <Box
                  sx={{
                    width: "40%",
                    height: "100%",
                    ml: 1,
                    borderBottom: "0.5px solid black",
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      color: "#C2C2C2",
                    }}
                    onClick={locationModalOpen}
                  >
                    <LocationOnOutlined htmlColor="green" />
                    {location}
                  </Button>
                  <LocationModal
                    {...locationModalProps}
                    setLocation={setLocation}
                    setLocationCode={setLocationCode}
                    setLat={setLat}
                    setLng={setLng}
                  />
                </Box>

                <Box
                  sx={{
                    width: "60%",
                    height: "100%",
                    ml: 1,
                    borderBottom: "0.5px solid black",
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      color: "#C2C2C2",
                    }}
                    onClick={categoryModalOpen}
                  >
                    <DiningOutlined htmlColor="orange" />
                    {category}
                  </Button>
                  <CategoryModal
                    {...categoryModalProps}
                    setCategory={setCategory}
                    setCategoryCode={setCategoryCode}
                  />
                </Box>
              </Box>
              <Box sx={{ width: "50%", height: "100%" }}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    ml: 1,
                    borderBottom: "0.5px solid black",
                  }}
                >
                  <Button
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      color: "#C2C2C2",
                    }}
                    onClick={restaurantModalOpen}
                  >
                    <Search htmlColor="#99DBF5" />
                    {restaurant}
                  </Button>
                  <RestaurantModal
                    {...restaurantModalProps}
                    setRestaurant={setRestaurant}
                    purpose="restaurant"
                  />
                </Box>
              </Box>
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
                  <Typography>건</Typography>
                </Box>
              </Box>
              <Box sx={{ width: "90%", height: "100%" }}>
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
                  <MapModal {...MapModalProps} restaurants={data} />
                </Box>
              </Box>
              {/* 선택한 필터가 표시될 박스 필요 */}
            </Box>
          </Box>
        </Container>

        <Container
          maxWidth="lg"
          sx={{
            height: "auto",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            alignContent: "center",
          }}
        >
          {data.map((item: any, index: any) => (
            <ActionCard
              key={index}
              src={item.photo.pc.l}
              title={item.name}
              tag={`${item.small_area.name} / ${item.genre.name}`}
              id={item.id}
              
            />
          ))}
          
        </Container>
        {data ? (
          null
        ) : <div style={{ backgroundColor : "red", height : "100px" }} ref={target}></div>}
      </Box>
    </Layout>
  );
}

export default SearchResultPage;


