import { Box, Button, Container, Typography } from "@mui/material";
import Layout from "../components/layout";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {MenuBook, Wifi, CreditCard, MoreVert} from '@mui/icons-material';
import axios from "axios";

function store() {
  // 이 페이지의 모든 요소는 현재 임시로 작성되었음

  return (
      <Layout>
        <Box sx={{ height : "auto", pt : 9 }}>
          <Box sx={{ width : "100%", height : "30px", borderBottom : "#C2C2C2 1px dashed" }}>
            <Container maxWidth="lg" sx={{ height : "100%" }}>
              <Button sx={{ width : "100%", height : "30px", display : "flex", justifyContent : "flex-start" , py : 1, pl : 0 }}>
                <ArrowCircleLeftIcon htmlColor="skyblue" />
                <Typography sx={{ fontSize : "16px" }}>검색 결과 다시 보기</Typography>
              </Button>
            </Container>
          </Box>

          <Box sx={{ width : "100%", height : "450px", borderBottom : "#C2C2C2 1px dashed" }}>
            <Container maxWidth="lg" sx={{ height : "100%", py : 5 }}>
              <Box sx={{ width : "100%", height : "100%", display : "flex", alignContent : "center" }}>
                <Box sx={{ width : "75%", height : "100%"}}>
                  <Typography>すし 京辰 成田空港北ウイング店</Typography>
                  <Typography variant="h4">kyotatsu Naritakukokitauinguten</Typography>
                  {/* 가게 편의기능? 에 따라 아래의 종류가 달라짐 */}
                  {/* 아니 가게에따라 이런 요소가 다른데 그럼 모든 아이콘을 다 import해둬야하나?? */}
                  {/* 아니면 아이콘을 다 import해둔 컴포넌트를 만들어서 빼와야하는건가 ?? 뭐지 ?? */}
                  <Box sx={{ width : "100%", display : "flex", my : 2, color : "red" }}>
                    {/* 지금은 이렇게해두지만 나중엔 map사용 */}
                    <Box sx={{ display : "flex" }}>
                      <CreditCard />
                      <Typography>카드</Typography>
                      <MoreVert />
                    </Box>
                    <Box sx={{ display : "flex" }}><Wifi /><Typography>와이파이</Typography><MoreVert /></Box>
                    <Box sx={{ display : "flex" }}><MenuBook /><Typography>한국어 메뉴</Typography><MoreVert /></Box>
                  </Box>
                  <Box sx={{ width : "100%", height : "240px", display : "flex" }}>
                    <Box sx={{ width : "248px", height : "100%" }}>
                      <img src="https://via.placeholder.com/240x240" alt="store" />
                    </Box>
                    <Box sx={{ width : "100%", height : "80%", ml : 3 }}>
                      <Typography sx={{ fontSize : "19px" }}>초밥,해산물 요리,초밥 / 생선요리그외</Typography>
                      <Typography sx={{ fontSize : "19px" }}>점심 3,500 엔 저녁 3,500 엔</Typography>
                      <Typography sx={{ fontSize : "19px" }}>0476-29-5522 (+81-476-29-5522)</Typography>
                      <Typography sx={{ fontSize : "19px" }}>월～일 8:00～20:30(L.O.20:30)</Typography>
                      <Typography sx={{ fontSize : "19px" }}>나리타/사와라(치바현)JR 나리타선 나리타 공항역 도보10분</Typography>
                      <Box sx={{ width : "100%", height : "20%", py : 1}}>
                        <Button>점포 상세</Button>
                        <Button>감염예방</Button>
                      </Box>
                    </Box>
                    
                  </Box>

                </Box>
                <Box sx={{ width : "25%", height : "100%"}}>

                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Layout>
  )
}

export default store;