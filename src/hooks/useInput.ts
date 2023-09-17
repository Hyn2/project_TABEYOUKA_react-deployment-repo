import { ChangeEvent, useState } from "react";

export default function useInput(initailV : string){
    const [v, setV] = useState<string>(initailV)
    
    const onChange = (e : ChangeEvent<HTMLInputElement>) => {
        setV(e.target.value)
    }

    return {value : v, onChange}
}