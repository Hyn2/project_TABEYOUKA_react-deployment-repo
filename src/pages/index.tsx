import { Container, Typography, Box, Button } from '@mui/material';
import Layout from '../components/layout';
import ModalButton from '../components/common/button/ModalButton';
import { LocationOnOutlined,DiningOutlined, Search } from '@mui/icons-material';
import useToggle from '../hooks/useToggle';
import {LocationModal, CategoryModal, RestaurantModal} from '../components/ui/modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';


function MainPage() {

  // async function fetchLargeArea(url: string): Promise<string> {
  //   try {
  //     const response = await axios.get(url);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
  
  // const largeAreaUrl = 'http://webservice.recruit.co.jp/hotpepper/large_area/v1/';
  // fetchLargeArea(largeAreaUrl)
  //   .then((Data) => {
  //     console.log(Data);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });


  const {setTrue : locationModalOpen, ...locationModalProps} = useToggle();
  const {setTrue : restaurantModalOpen, ...restaurantModalProps} = useToggle();
  const {setTrue : categoryModalOpen, ...categoryModalProps} = useToggle();
  
  const navigate = useNavigate();
  const searchButtonHandler = () => {
    const params = {
      //  genre:`"G001"`,
      //  large_area:"Z011",
      //  middle_area:"Y010",
       name:"個室居酒屋 いろり屋 iroriya 東京駅八重洲店"
     };
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/api/search', {params});
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    navigate("/search");
  }
  
  const [location, setLocation] = React.useState<string>("위치");
  const [category, setCategory] = React.useState<string>("요리 장르");
  const [restaurant, setRestaurant] = React.useState<string>("레스토랑 이름");
  React.useEffect(() => {
    locationModalProps.setFalse();
    categoryModalProps.setFalse();
    restaurantModalProps.setFalse();
  }, [location, category, restaurant]);

  return (
    <Layout>
      <Container maxWidth={false} sx={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center",px : "0 !important",backgroundImage : `url(${"https://www.exploretravel.com.au/images/transform/v1/crop/frm/130854433/1b6a6656-f316-4d72-ba10-2067288e49b7.jpg/r0_138_2700_1662_w1200_h678_fmax.jpg"})`, height : "75vh", backgroundRepeat : "no-repeat", backgroundSize : "cover", position : "relative"}}>
        <Typography color={"white"} fontSize={"48px"} sx={{fontWeight : "bold", textAlign : "center", my : 7}}>가고 싶은 가게를 지금바로 찾아보세요!</Typography>
        <Box sx={{width: "100%", height : "23%",display : "flex", justifyContent : "center"}}>
          <Box sx={{ backgroundColor : "white", width : "40%", height : "100%", borderRadius: "10px", display : "flex" }}>
            <Box sx={{ width : "90%", display : "flex", justifyContent : "center", ml : 1,flexDirection : "column"}}>
              <Box sx={{ width : "100%", display : "flex"}}>
                {/* Location Modal Button*/}
                  <ModalButton title={location} Icon={LocationOnOutlined} iconColor={"green"} handleOpen={locationModalOpen} />
                  <LocationModal {...locationModalProps} setLocation={setLocation} />
                {/* Category Modal Button*/}
                  <ModalButton title={category} Icon={DiningOutlined} iconColor={"orange"} handleOpen={categoryModalOpen} />
                  <CategoryModal {...categoryModalProps} setCategory={setCategory}/>
              </Box>
              <Box sx={{ width : "100%", borderRadius : "5px", my : 1, display : "flex" }}>
                {/* Restaurant Modal Button */}
                <ModalButton title={"레스토랑 이름"} Icon={Search} iconColor={"#99DBF5"} handleOpen={restaurantModalOpen} />
                <RestaurantModal {...restaurantModalProps} setRestaurant={setRestaurant}/>
              </Box>
            </Box>
            <Box sx={{ width : "30%", display : "flex", borderRadius : "5px", my : 7, mx : 2, bgcolor: "#FFA41B", color: "white", "&:hover": { bgcolor: "#FFC107", transition: "all 0.4s ease-in-out" }}}>
              <Button onClick={searchButtonHandler} sx={{ color : "black", mx : 1, flexGrow : 1, py : 1.2, justifyContent: "center"}}>
                <Typography variant='caption' sx={{ fontSize : "18px" }}>
                검색
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export default MainPage;