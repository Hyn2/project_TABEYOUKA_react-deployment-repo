import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ReviewContainer from "../review/ReviewContainer";
import TabPanel from "./TabPanel";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import UserMap from "../UserMap";

const UserTab = () => {

  const [value, setValue] = useState(1);

  const selectTab = (event: React.SyntheticEvent, value: number) => {
    setValue(value);
  }
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };
  const googleMapApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
  return (
    <Box>
      <Tabs variant="fullWidth" value={value} onChange={selectTab} aria-label="usertabs" sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "black",
            opacity: "0.4" // 선택된 Tab의 색상을 변경
          },
          paddingBottom: "0.05%"
        }}
      >
        <Tab label="리뷰" value={1} sx={{
          "&.Mui-selected": {
            color: "black", // 선택된 탭의 글자 색 변경
          },
        }}/>
        <Tab label="지도" value={2} sx={{
          "&.Mui-selected": {
            color: "black", // 선택된 탭의 글자 색 변경
          },
        }}/>
      </Tabs>
      <TabPanel value={value} index={1}><ReviewContainer /></TabPanel>
      <TabPanel value={value} index={2}>
        <Wrapper apiKey={googleMapApiKey} render={render}>
          <UserMap></UserMap>
        </Wrapper>
      </TabPanel>
    </Box>
  )
}



export default UserTab;

