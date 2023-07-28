import { Box, Button } from "@mui/material";
import locationData from "../../locationData.json";
// import stationData from "../../stationData.json";
import middleArea from "../../middleArea.json";
import useGetCode from "../../hooks/useGetCode";

interface Info {
  [key: string]: string[];
}



const MiddleLocation = ({ highLocations, setLocation, setLocationCode}: {
  highLocations: string;
  setLocation: (value: string) => void;
  setLocationCode: (value: string) => void;
}) => {
  const onClickLocation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const location = event.currentTarget.innerText;
    const code = useGetCode(middleArea, location);
    console.log(code);
    setLocationCode(code)
    setLocation(location);
  };


  
    const lowerLocations: Info = locationData;
    return (
      <>
        {Object.keys(lowerLocations).map((key) => {
          if (key === highLocations) {
            const locations = lowerLocations[key];
            return (
              <div key={key}>
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pb: 5,
                  }}
                >
                  <Box sx={{ width: "100%", height: "100%" }}>
                    {locations.map((location, index) => (
                      <Button
                        onClick={onClickLocation}
                        key={location + index}
                        sx={{
                          width: "100%",
                          height: "60px",
                          justifyContent: "flex-start",
                          fontSize: "15px",
                          color: "black",
                          borderBottom: "0.5px dashed black",
                          fontWeight: 350,
                        }}
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
};

export default MiddleLocation;
