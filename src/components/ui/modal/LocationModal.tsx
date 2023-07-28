import { Box, Button, Modal, Typography, CircularProgress } from "@mui/material"
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import ImageSlider from "../../common/ImageSlider";
import type { UseToggle } from "../../../types/hooks.interface";
import MiddleLocation from "../../common/MiddleLocation";
import { useState } from "react";
import React from "react";
import GNB from "../../layout/header/GNB";
import Geolocation from '@react-native-community/geolocation';
import RestaurantModal from "./RestaurantModal";
import useToggle from "../../../hooks/useToggle";

const locations = [
  ["北海道"],
  ["青森", "岩手", "宮城", "秋田", "山形", "福島"],
  ["新潟", "富山", "石川", "福井", "山梨", "長野"],
  ["東京", "神奈川", "埼玉", "千葉", "茨城", "栃木", "群馬"],
  ["岐阜", "静岡", "愛知", "三重"],
  ["滋賀", "京都", "大阪", "兵庫", "奈良", "和歌山"],
  ["鳥取", "島根", "岡山", "広島", "山口"],
  ["徳島", "香川", "愛媛", "高知"],
  ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島"],
  ["沖縄"]
];



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  height: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pb: 5,
  overflow: 'auto'
};

const centerStyle = {
  display : "flex", justifyContent : "center", alignItems : "center"
}


const imageSrc = [
  "https://www.visit-hokkaido.jp/lsc/upfile/top/visual/0000/0015/15_1_l.jpg",
  "https://skywardplus.jal.co.jp/wp-content/uploads/2022/06/detail_sightseeing_aomori.jpg",
  "https://smout-uploads.imgix.net/uploads/city/image/931/%E6%A3%9A%E7%94%B0-2.jpg",
  "https://www.gotokyo.org/jp/destinations/eastern-tokyo/images/area024_1000_78.jpg",
  "https://joetsukankonavi.jp/files/page-body/photo530501.jpg?1Nwyc0",
  "https://static.gltjp.com/glt/prd/data/article/21000/20172/20220706_021112_75cf4196_w1920.jpg",
  "https://fs.tour.ne.jp/index.php/file_manage/view/?contents_code=curation&file_name=419/21347/9aa0e0842b4f49267340d37482f129ba.jpg&w=1200",
  "https://upload.wikimedia.org/wikipedia/commons/2/29/Onaruto-bridge_and_Naruto_Channel%2CNaruto-city%2CJapan.JPG",
  "https://www.crossroadfukuoka.jp/storage/special_feature_paragraphs/72/responsive_images/i7dnRPRAs2mYbTaG5PBn3y0dmr7HynrFPvoGFkLE__1673_1116.jpg",
  "https://a.cdn-hotels.com/gdcs/production104/d560/80ecd04f-0ecb-4b58-ad25-a23dda8acf77.jpg",
];





export default function LocationModal(props: Omit<UseToggle, "setTrue"> & {
    setLocation: (category: string) => void,
    setLocationCode: (value: string) => void,
    setLat: (value: number) => void,
    setLng: (value: number) => void,
  }) {
    const [loading, setLoading] = useState(false);
    const myPosition = () => {
      setLoading(true);
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log(`latitude: ${latitude}, longitude: ${longitude}`, typeof latitude);
          props.setLat(latitude);
          props.setLng(longitude);
          setLoading(false);
          props.setFalse();
        },
        error => {console.log(error); setLoading(false);},
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
      );
      props.setLocation("現在地");
      
    }

    const { setTrue: restaurantModalOpen, ...restaurantModalProps } = useToggle();
    const [mode, setMode] = React.useState<boolean>(false);
    const [highLocations, setHighLocations] = useState("");

    const handleLocationClick = (location: string) => {
    console.log('Clicked location:', location);
    setHighLocations(location); // 클릭된 위치 값을 highLocations 상태로 업데이트
    setMode(true); 
    };

    return <Modal
    open={props.value}
    onClose={props.setFalse}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box>
      <Typography variant="h6" textAlign={"center"} sx={{ my : 2, color : "white", fontWeight : "normal" }}>
          위치
      </Typography>
      <Box sx={modalStyle}>
        {/* 현재위치 */}
        <Box sx={{ width : "100%", height : "15%", ...centerStyle }}>
            <Button onClick={myPosition} sx={{ width : "40%", height : "40%", fontSize : "18px", color : "black", "&:hover": { border : "0.5px solid red", transition: "all 0.3s ease-in-out" }, "&:not(:hover)": { border : "1px #EEEEEE solid", transition: "all 0.3s ease-in-out" } }}>
            <MyLocationIcon sx={{ color : "red", mr : 0.5 }}/>
            현위치보기
            </Button>
            <Box sx={{ position : "absolute" }}>
              {loading ? <CircularProgress /> : null}
            </Box>
        </Box>
        {/* 지역이름 텍스트 */}
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>지역 이름</Typography>
        </Box>
        {/* 지역 검색창 */}
        <Box sx={{ width : "100%", height : "15%", ...centerStyle }}>
            <Button onClick={restaurantModalOpen} sx={{ border : "1px #C2C2C2 solid", width : "40%", height : "40%", fontSize : "18px", color : "#C2C2C2", justifyContent : "flex-start" }}>
            <SearchIcon sx={{ color : "#99DBF5", mr : 1 }} />
            지역
            </Button>
            <RestaurantModal {...restaurantModalProps} setRestaurant={props.setLocation} purpose="location" />
        </Box>
        {/* 전체지역 텍스트 */}
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>전체 지역</Typography>
        </Box> 
        {/* 지역선택 슬라이더 */}
        <Box sx={{ width : "100%", height : "44%", ...centerStyle }}>
            <ImageSlider>
              <ImageSlider.LeftButton/>
                <ImageSlider.ImageContainer>
                  {
                    imageSrc.map((src,idx) => 
                    <ImageSlider.ImageBox src={src} key={src}>
                      {
                      locations[idx].map((location,idx) =>
                        <ImageSlider.TagButton key={location + String(idx)} title={location} onClick={handleLocationClick}/>
                      )
                      }
                    </ImageSlider.ImageBox>)
                  }
                </ImageSlider.ImageContainer>
              <ImageSlider.RightButton maxLength={imageSrc.length}/>
            </ImageSlider>
        </Box>
        {/* 하위지역 선택 툴 */}
        <Box sx={{ width : "100%", height : "80px", ...centerStyle,}}>
          <Box sx={{ width : "90%", height : "100%" }}>
            { mode && <MiddleLocation  highLocations={highLocations} setLocation={props.setLocation} setLocationCode={props.setLocationCode}/>}
          </Box>
        </Box>
        
      </Box>
    </Box>
  </Modal>
}