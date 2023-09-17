import { useState } from "react";
import { UseImageSlider } from "../types/hooks.interface";

const useImageSlider = (defaultIndex : number) : UseImageSlider => {
    const [currentIndex, setCurrentIndex] = useState<number>(defaultIndex);

    const goPrev = () => {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    };
  
    const goNext = () => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    return {currentIndex, goPrev, goNext};
}

export default useImageSlider;