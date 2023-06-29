import { Box, Button } from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


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


const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  // ={currentIndex === 0}
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Button onClick={handlePrevClick} sx={{ visibility : currentIndex === 0 ? "hidden" : "visible" }}>
          <ArrowBackIosNewIcon sx={{ fontSize : "30px" }}/>
        </Button>
      </Box>

      <Box sx={{ display: "flex", overflow: "hidden", width: "780px", height: "250px" }}>
        <Box sx={{ display: "flex", flexGrow : 1, transition: "transform 0.5s ease", transform: `translateX(-${currentIndex * 260}px)` }}>
          {imageSrc.map((src, index) => (
            <Box key={index} sx={{ mr : "10px", backgroundImage : `url(${src})`, backgroundSize : "cover", width : "250px", height : "250px"}}>
              <Box sx={{ width : "100%", height : "100%", mt : 6, ali : "center" }}>
                {locations[index].map((location, i) => (
                  <Button key={i} className="slider__box" sx={{ width : "100px", bgcolor : "rgb(0,0,0,0.5)", border : "white solid 0.4px", color : "white", mx : 1.5, my : 0.5}}>   
                      {location}
                  </Button>
                ))}
              </Box>  
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button onClick={handleNextClick} sx={{ visibility : currentIndex >= imageSrc.length - 3 ? "hidden" : "visible" }}>
          <ArrowForwardIosIcon sx={{ fontSize : "30px" }}/>
        </Button>
      </Box>

    </Box>
  );
};

export default ImageSlider;