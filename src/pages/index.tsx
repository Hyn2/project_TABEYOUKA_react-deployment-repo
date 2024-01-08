  import { Typography, Box, Button, useTheme, useMediaQuery, SxProps } from "@mui/material";
  import ModalButton from "../components/common/button/ModalButton";
  import {
    LocationOnOutlined,
    DiningOutlined,
    Search,
    RestaurantMenu
  } from "@mui/icons-material";
  import useToggle from "../hooks/useToggle";
  import {
    LocationModal,
    CategoryModal,
    RestaurantModal,
  } from "../components/ui/modal";
  import { useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { useSnackbar } from "notistack";
  import Footer from "../components/layout/footer";

  const backgroundImage = "https://www.exploretravel.com.au/images/transform/v1/crop/frm/130854433/1b6a6656-f316-4d72-ba10-2067288e49b7.jpg/r0_138_2700_1662_w1200_h678_fmax.jpg";
  
  function MainPage() {
    const theme = useTheme();
    const isDownMD = useMediaQuery(theme.breakpoints.down("md"));

    const { setTrue: locationModalOpen, ...locationModalProps } = useToggle();
    const { setTrue: restaurantModalOpen, ...restaurantModalProps } = useToggle();
    const { setTrue: categoryModalOpen, ...categoryModalProps } = useToggle();
    
    const navigate = useNavigate();
    
    const [locationCode, setLocationCode] = useState<string>("");
    const [categoryCode, setCategoryCode] = useState<string>("");
    const [lat, setLat] = useState<number>(0);
    const [lng, setLng] = useState<number>(0);

    const [location, setLocation] = useState<string>("エリア");
    const [category, setCategory] = useState<string>("料理ジャンル");
    const [restaurant, setRestaurant] = useState<string>("レストラン名");

    const searchButtonHandler = () => {
      if (location === "エリア" && category === "料理ジャンル" && restaurant === "レストラン名") {
        return enqueueSnackbar("検索条件を入力してください", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      let restaurantValue = restaurant;
      if (restaurantValue == "レストラン名") {
        restaurantValue = "";
      }
      let latValue : string = lat.toString();
      let lngValue : string = lng.toString();
      if (lat === 0) {
        latValue = "";
        lngValue = "";
      }
      const params = {
        genre: `${categoryCode}`,
        area: `${locationCode}`,
        name: `${restaurantValue}`,
        lat: `${latValue}`,
        lng: `${lngValue}`,
      };
      const queryString = new URLSearchParams(params).toString();
      navigate(`/search?${queryString}`);
    };

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
      locationModalProps.setFalse();
      categoryModalProps.setFalse();
      restaurantModalProps.setFalse();
    }, [location, category, restaurant]);

    return (
      <>
        <Box sx={mainContainer} >
          <img src={backgroundImage} alt="mainImg" width="0" height="0" style={{ display: "none !important" }} />
          <Typography sx={{fontSize: isDownMD ? "27px" : "48px", ...sloganTypo}} >行きたいお店を見つけてみよう！</Typography>
            <Box sx={{width: isDownMD ? "90%" : "40%", ...contentBox}} >
              <Box sx={{width: isDownMD ? "60%" : "90%", ...conditionButtonBox}} >
                <Box sx={{...modalButtonCon}}>
                  {/* Location Modal Button*/}
                  <ModalButton
                    title={location}
                    Icon={LocationOnOutlined}
                    iconColor={"green"}
                    handleOpen={locationModalOpen}
                  />
                  <LocationModal
                    {...locationModalProps}
                    setLocation={setLocation}
                    setLocationCode={setLocationCode}
                    setLat={setLat}
                    setLng={setLng}
                  />
                  
                </Box>
                <Box sx={{...modalButtonCon}}>
                  {/* ReviewList Modal Button*/}
                  <ModalButton
                    title={category}
                    Icon={DiningOutlined}
                    iconColor={"orange"}
                    handleOpen={categoryModalOpen}
                  />
                  <CategoryModal
                    {...categoryModalProps}
                    setCategory={setCategory}
                    setCategoryCode={setCategoryCode}
                  />
                </Box>
                <Box sx={{...modalButtonCon}}>
                  {/* Restaurant Modal Button */}
                  <ModalButton
                    title={restaurant}
                    Icon={Search}
                    iconColor={"#99DBF5"}
                    handleOpen={restaurantModalOpen}
                  />
                  <RestaurantModal
                    {...restaurantModalProps}
                    setRestaurant={setRestaurant}
                    setLocation={setLocation}
                    setLocationCode={setLocationCode}
                    purpose={"restaurant"}
                  />
                </Box>
              </Box>
              <Box sx={{ ...searchButtonBox }} >
                <Button onClick={searchButtonHandler} sx={{ color: "black", flexGrow: 1, py: 1.2, 
                  "&:hover svg": {
                    transform: "rotate(360deg) scale(1.5)",
                    color: "#39393B",
                  }
                }}>
                  <RestaurantMenu sx={{ 
                    fontSize: "40px", 
                    transition: "transform 1s, color 0.5s",
                    color: "white",
                  }} />
                </Button>
              </Box>
            </Box>
        </Box>
        <Footer />
      </>
    );
  }

export default MainPage;

const mainContainer : SxProps = {
  boxSizing: 'border-box',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${backgroundImage})`,
  backgroundColor: "#F5F5F5",
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}

const sloganTypo = {
  fontWeight: "bold",
  textAlign: "center",
  my: 2,
  textShadow: "1px 1px 1px black",
  color: "white",
}

const contentBox = {
  backgroundColor: "rgba(255,255,255,0.5)",
  height: "200px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 2,
}

const modalButtonCon = {
  height: "40%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const conditionButtonBox = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  mr: 3,
}

const searchButtonBox = {
  width: "20%",
  height: "100px",
  display: "flex",
  borderRadius: "20px",
  boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.3)",
  bgcolor: "#39393B",
  transition: "all 0.4s ease-in-out",
  "&:hover": {
    bgcolor: "white",
    boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.6)",
    transition: "all 0.4s ease-in-out",
  }
}
