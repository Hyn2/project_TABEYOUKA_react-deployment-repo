import React from "react";
import { UseToggle } from "../types/hooks.interface";
/**
 * @description 이 함수는 true, false 값을 가지는 value와 setTrue, setFalse 함수를 반환합니다.
 * @returns 
 */
const useToggle = () : UseToggle => {
    const [value, setValue] = React.useState(false);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    return {value, setTrue, setFalse}
}

export default useToggle;