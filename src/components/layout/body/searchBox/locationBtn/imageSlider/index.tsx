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

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Button onClick={handlePrevClick} disabled={currentIndex === 0}>
          <ArrowBackIosNewIcon sx={{ fontSize : "30px" }}/>
        </Button>
      </Box>

      <Box sx={{ display: "flex", overflow: "hidden", width: "780px", height: "250px" }}>
        <Box sx={{ display: "flex", width: `${imageSrc.length * 250}px`, transition: "transform 0.5s ease", transform: `translateX(-${currentIndex * 260}px)` }}>
          {imageSrc.map((src, index) => (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mr : "10px" }}>
            <img src={src} alt={`image-${index}`} width="250px" height="250px" />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button onClick={handleNextClick} disabled={currentIndex >= imageSrc.length - 1} >
          <ArrowForwardIosIcon sx={{ fontSize : "30px" }}/>
        </Button>
      </Box>

    </Box>
  );
};

export default ImageSlider;