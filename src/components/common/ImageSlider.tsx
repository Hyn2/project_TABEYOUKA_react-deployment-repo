import { Box, Button } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import type { IProps } from "../../types/common.interface";
import useImageSlider from "../../hooks/useImageSlider";
import { createContext, useContext } from "react";
import type { UseImageSlider } from "../../types/hooks.interface";

const ImageSliderContext = createContext<UseImageSlider>({
  currentIndex : 0,
  goNext : ()=>{throw Error("goNext is not defined")},
  goPrev : ()=>{throw Error("goPrev is not defined")},
});

export default function ImageSlider({children} : IProps){
    const imageSliderLogics = useImageSlider(0);
  
    return  <ImageSliderContext.Provider value={imageSliderLogics}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {children}
              </Box>
            </ImageSliderContext.Provider>
}

ImageSlider.LeftButton = () => {
  const {goPrev, currentIndex} = useContext(ImageSliderContext);
  
    return  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Button onClick={goPrev} sx={{ visibility : currentIndex === 0 ? "hidden" : "visible" }}>
                <ArrowBackIosNewIcon sx={{ fontSize : "30px" }}/>
              </Button>
            </Box>
}

ImageSlider.RightButton = ({maxLength} : {maxLength : number}) => {
    const {goNext, currentIndex} = useContext(ImageSliderContext);

    return  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Button onClick={goNext} sx={{ visibility : currentIndex >= maxLength- 3 ? "hidden" : "visible" }}>
                <ArrowForwardIosIcon sx={{ fontSize : "30px" }}/>
              </Button>
            </Box>
}

ImageSlider.ImageContainer = ({children} :IProps ) => {
    const {currentIndex} = useContext(ImageSliderContext);

    return (
    <Box sx={{ display: "flex", overflow: "hidden", width: "780px", height: "250px" }}>
      <Box sx={{ display: "flex", flexGrow : 1, transition: "transform 0.5s ease", transform: `translateX(-${currentIndex * 260}px)` }}>
        {children}
      </Box>
    </Box>
    )
}

interface ImageBoxProps extends IProps {
  src : string
}

ImageSlider.ImageBox = ({children, src} : ImageBoxProps) => {
    return  <Box  sx={{ mr : "10px", backgroundImage : `url(${src})`, backgroundSize : "cover", width : "250px", height : "250px"}}>
              <Box sx={{ width : "100%", height : "100%", mt : 6, alignItems : "center" }}>
                {children}
              </Box>  
            </Box>
}

ImageSlider.TagButton= ({title, onClick} : {title : string, onClick : (title : string)=>void}) => {
    return  <Button onClick={()=>onClick(title)} sx={{ width : "100px", bgcolor : "rgb(0,0,0,0.5)", border : "white solid 0.4px", color : "white", mx : 1.5, my : 0.5}}>   
                {title}
            </Button>
}