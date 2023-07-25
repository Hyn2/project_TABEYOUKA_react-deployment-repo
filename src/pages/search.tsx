import { Box, Button, Container, Typography } from "@mui/material";
import Layout from "../components/layout";
import useToggle from "../hooks/useToggle";
import {
  LocationModal,
  CategoryModal,
  RestaurantModal,
  MapModal,
} from "../components/ui/modal";
import ActionCard from "../components/ui/actionCard/infoCard";
import {
  LocationOnOutlined,
  DiningOutlined,
  Search,
  MapOutlined,
} from "@mui/icons-material";
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import searchRestaurant from "../api/search";
import type { Restaurant } from ".././types/restaurant.interface.ts";

function SearchResultPage() {
  const { setTrue: locationModalOpen, ...locationModalProps } = useToggle();
  const { setTrue: restaurantModalOpen, ...restaurantModalProps } = useToggle();
  const { setTrue: categoryModalOpen, ...categoryModalProps } = useToggle();
  const { setTrue: FilterModalOpen, ...FilterModalProps } = useToggle();
  const { setTrue: MapModalOpen, ...MapModalProps } = useToggle();

  const [location, setLocation] = useState<string>("위치");
  const [category, setCategory] = useState<string>("요리 장르");
  const [restaurant, setRestaurant] = useState<string>("레스토랑 이름");
  useEffect(() => {
    locationModalProps.setFalse();
    categoryModalProps.setFalse();
    restaurantModalProps.setFalse();
  }, [location, category, restaurant]);

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
                  <MapModal {...MapModalProps} />
                </Box>
              </Box>
              {/* 선택한 필터가 표시될 박스 필요 */}
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignContent: "center",
          }}
        >
          <ActionCard
            src={
              "https://i0.wp.com/www.fukuoka-now.com/wp-content/uploads/2019/12/fn253-gourmet-rakutenchi-WEB-001.jpg?fit=1400%2C931&ssl=1"
            }
            title={"モツ鍋うまい"}
            tag={"＃モツ鍋"}
          />
          <ActionCard
            src={
              "https://i0.wp.com/www.fukuoka-now.com/wp-content/uploads/2019/12/fn253-gourmet-rakutenchi-WEB-001.jpg?fit=1400%2C931&ssl=1"
            }
            title={"モツ鍋うまい"}
            tag={"＃モツ鍋"}
          />
          <ActionCard
            src={
              "https://i0.wp.com/www.fukuoka-now.com/wp-content/uploads/2019/12/fn253-gourmet-rakutenchi-WEB-001.jpg?fit=1400%2C931&ssl=1"
            }
            title={"モツ鍋うまい"}
            tag={"＃モツ鍋"}
          />
        </Box>
      </Box>
    </Layout>
  );
}

export default SearchResultPage;
