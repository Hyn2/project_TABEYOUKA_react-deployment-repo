import React from "react";

const UserMap = ()=>{
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  
  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {         
        center : { lat: 37.569227, lng: 126.9777256},
        zoom : 16,}));
    }
  }, [ref, map]);

  return (
    <div ref={ref} style={{width:"100%", height: "400px"}} />
  )
}

export default UserMap;