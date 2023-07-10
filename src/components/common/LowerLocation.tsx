import { Box, Button } from "@mui/material";

const lowerLocations :{[key : string] : Array<string>} = {
  "홋카이도" : ["십만봉", "후라노", "니세코", "루스츠", "오노마치", "토야코", "후라노", "루스츠", "오노마치", "토야코"],
  "아오모리현" : ["아오모리", "히로사키", "가쓰마쓰", "시노노헤", "토와다", "히로사키", "가쓰마쓰", "시노노헤", "토와다"],
  "아키타현" : ["아키타", "오가사와라", "유리히라", "아키타", "오가사와라", "유리히라"],
  "이와테현" : ["이와테", "모리오카", "히라노", "이와테", "모리오카", "히라노"],
  "야마가타현" : ["야마가타", "사쿠라마보", "야마가타", "사쿠라마보"],
  "미야기현" : ["엄준식", "은", "살아", "있다", "........"],
  "후쿠시마현" : ["후쿠시마", "이즈미사키", "바나이", "이즈미사키", "바나이"],
};

const stationInfo :{[key : string] : Array<string>} = {
  "홋카이도" : ["아사부", "아사히카와", "바스센타 마에", "지토세"],
  "아오모리현" : ["아오모리", "고쇼가와라", "하치노헤", "히로사키", "혼 하치노헤", "엄준식", "은", "살아", "있다", "........", "아오모리", "고쇼가와라", "하치노헤", "히로사키", "혼 하치노헤", "엄준식", "은", "살아", "있다", "........"],
  "아키타현" : ["아키타", "오가사와라", "유리히라", "아키타", "오가사와라", "유리히라"],
  "이와테현" : ["이와테", "모리오카", "히라노", "이와테", "모리오카", "히라노"],
  "야마가타현" : ["야마가타", "사쿠라마보", "야마가타", "사쿠라마보"],
  "미야기현" : ["엄준식", "은", "살아", "있다", "........"],
  "후쿠시마현" : ["후쿠시마", "이즈미사키", "바나이", "이즈미사키", "바나이"],
};


const LowerLocationModal = ({ highLocations, mode, setLocation } : { highLocations: string, mode: string, setLocation: (value: string) => void }) => {
  
  const onClickLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const location = event.currentTarget.innerText;
    setLocation(location);
  };  

  if (mode === "지역") {
    return (
      <>
        {Object.keys(lowerLocations).map((key) => {
          if (key === highLocations) {
            const locations = lowerLocations[key];
            return (
              <div key={key}>
                <Box sx={{ width : "100%", height : "60px", display : "center", justifyContent : "center", alignItems : "center"}}>
                  <Box sx={{ width : "100%", height : "100%", borderBottom : "0.5px dashed black" }}>
                    <Button sx={{ width : "100%", height : "100%", justifyContent : "flex-start", fontSize : "15px", color : "black", fontWeight : 350 }}>전체</Button>
                  </Box>
                </Box>
                <Box sx={{ width: "100%", height: "auto", display: "flex", justifyContent: "center", alignItems: "center", pb : 5 }}>
                  <Box sx={{ width: "100%", height: "100%" }}>
                    {locations.map((location, index) => (
                      <Button
                        key={location + index}
                        sx={{ width: "100%", height: "60px", justifyContent: "flex-start", fontSize: "15px", color: "black", borderBottom: "0.5px dashed black", fontWeight : 350 }}
                        onClick={onClickLocation}
                      >
                        {location}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </div>
            );
          }
  
          return null;
        })}
      </>
    );
  }

  if(mode !== "지역"){
    return(
      <>
        {Object.keys(stationInfo).map((key) => {
          if (key === highLocations) {
            const stations = stationInfo[key];
            return (
              <div key={key}>
                <Box sx={{ width: "100%", height: "auto", display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap : "wrap", pb : 5 }}>
                    {stations.map((station, index) => (
                      <Button
                        onClick={onClickLocation}
                        key={station + index}
                        sx={{ width: "25%", height: "50%", justifyContent: "flex-start", fontSize: "13px", color: "black", fontWeight : "light" }}
                      >
                        {station}
                      </Button>
                    ))} 
                </Box>
              </div>
            );
          }
  
          return null;
        })}
      </>
    )
  }
  
};

export default LowerLocationModal;
