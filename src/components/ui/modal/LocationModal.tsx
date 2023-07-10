import { Box, Button, Modal, Typography } from "@mui/material"
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import ImageSlider from "../../common/ImageSlider";
import type { UseToggle } from "../../../types/hooks.interface";
import LowerLocation from "../../common/LowerLocation";
import { useState } from "react";
import React from "react";
import GNB from "../../layout/header/GNB";

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

const pages = [
  {key : '지역', onClick :()=> {console.log("Products")}},
  {key : '역', onClick :()=> {console.log("Pricing")}},
  {key : '명소', onClick : ()=> {console.log("Blog")}},
  {key : '호텔', onClick : ()=> {console.log("Blog")}}]


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

const locations = [
  ["홋카이도"],
  ["아오모리현", "아키타현", "이와테현", "야마가타현", "미야기현", "후쿠시마현"],
  ["니가타현", "토야마현", "이시카와현", "후쿠이현", "나가노현"],
  ["도쿄도", "가나가와현", "치바현", "사이타마현", "이바라키현", "토치키현", "군마현"],
  ["야마나시현", "시즈오카현", "기후현", "아이치현", "미에현"],
  ["교토부", "오사카부", "시가현", "효고현", "나라현", "와카야마현"],
  ["돗토리현", "시마네현", "오카야마현", "히로시마현", "야마구치현"],
  ["도쿠시마현", "가가와현", "에히메현", "고치현"],
  ["후쿠오카현", "사카현", "나가사키현", "오이타현", "구마모토현", "미야자키현", "가고시마현"],
  ["오키나와현"]
]

export default function LocationModal(props: Omit<UseToggle, "setTrue"> & { setLocation: (value: string) => void }){
    const [mode, setMode] = React.useState<string>(pages[0].key);

    const [gnbState, setGnbState] = React.useState(false);

    const [highLocations, setHighLocations] = useState("");

    const handleLocationClick = (location: string) => {
    console.log('Clicked location:', location);
    setGnbState(true)
    setHighLocations(location); // 클릭된 위치 값을 highLocations 상태로 업데이트
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
            <Button sx={{ width : "40%", height : "40%", fontSize : "18px", color : "black", "&:hover": { border : "0.5px solid red", transition: "all 0.3s ease-in-out" }, "&:not(:hover)": { border : "1px #EEEEEE solid", transition: "all 0.3s ease-in-out" } }}>
            <MyLocationIcon sx={{ color : "red", mr : 0.5 }}/>
            현위치보기
            </Button>
        </Box>
        {/* 지역이름 텍스트 */}
        <Box sx={{ bgcolor : "#EEEEEE", width : "100%", height : "8%", ...centerStyle }}>
            <Typography fontSize={"22px"} fontWeight={"500"}>지역 이름</Typography>
        </Box>
        {/* 지역 검색창 */}
        <Box sx={{ width : "100%", height : "15%", ...centerStyle }}>
            <Button sx={{ border : "1px #C2C2C2 solid", width : "40%", height : "40%", fontSize : "18px", color : "#C2C2C2", justifyContent : "flex-start" }}>
            <SearchIcon sx={{ color : "#99DBF5", mr : 1 }} />
            지역
            </Button>
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
            {gnbState &&
              <GNB pages={pages} onClick={setMode}/>
            }
            { mode === "지역" && <LowerLocation  highLocations={highLocations} mode={mode} setLocation={props.setLocation}/>}
            { mode === "역" && <LowerLocation  highLocations={highLocations} mode={mode} setLocation={props.setLocation}/>}
          </Box>
        </Box>
        
      </Box>
    </Box>
  </Modal>
}