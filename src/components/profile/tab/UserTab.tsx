import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ReviewContainer from "../review/ReviewContainer";
import TabPanel from "./TabPanel";
import UserMap from "../map/UserMap";

interface userTabProps {
  userId : string
}

const UserTab = ({userId} : userTabProps) => {

  const [value, setValue] = useState(1);

  const selectTab = (event: React.SyntheticEvent, value: number) => {
    setValue(value);
  }
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
      <TabPanel value={value} index={1}><ReviewContainer userId={userId} /></TabPanel>
      <TabPanel value={value} index={2}>
        <UserMap userId={userId} />
      </TabPanel>
    </Box>
  )
}



export default UserTab;

