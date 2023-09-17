export interface UseToggle {
    value : boolean
    setTrue : () => void;
    setFalse : () => void;
}

export interface UseImageSlider {
    currentIndex : number;
    goPrev : () => void;
    goNext : () => void;
}

export interface UseSearchInfo {
    locationInfo : string
    categoryInfo : string
    restaurantInfo : string
}

