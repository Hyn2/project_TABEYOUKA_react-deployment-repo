import { Box, Button, Modal, Typography } from "@mui/material"

import type { UseToggle } from "../../../types/hooks.interface";
import { useEffect, useState } from "react";
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 8,
};

const centerStyle = {
  display : "flex", justifyContent : "center", alignItems : "center"
}

type categoryType = {
    [key : string] : string[]
}

// 하나의 카테고리 객체에 하위로 카테고리가 있는 객체가 여러개 있음
const categoryTitle : categoryType = {
    "초밥 /해산물" : ["전체", "초밥", "회전 초밥", "회 / 해물요리", "게 요리", "복어 요리", "자라 요리", "장어 요리", "미꾸라지 요리", "겟장어 요리", "해산물 요리", "굴 전문 요리점", "고래 요리", "초빕 / 생선요리그외", "해물 덮밥", "굴 요리", "붕장어 요리"],
    "중식" : ["전체", "오코노미야키", "오코노미야키(히로시마 스타일)", "몬자야키", "타코야키", "아카시야키(효교현 아카시시의 향토 요리)", "야키소바", "오코노미야키 / 밀가루음식그외"],
    "고기구이 / 곱창" : ["전체", "고기구이", "곱창", "징기스칸 (양고기 구이)", "삼겹살"],
    "이자카야" : ["전체", "이자카야"],
    "다이닝 바 / 바 / 맥주홀" : ["전체", "다이닝 바", "음식점 또는 바", "맥주 레스토랑", "비어홀", "바", "샷 바", "아일랜드풍 주점", "와인 바", "소주 바", "스탠딩 바", "다트 바 / 골프 바", "펍", "라운지 바", "스페인풍 바 / 이탈리안풍 바"],
    "카레" : ["전체", "인도 카레", "태국 카레", "수프 카레", "카레라이스", "카레 그 외"],
    "라면 / 면요리" : ["전체", "메밀국수", "우동", "사누키 우동", "카레 우동", "나가사키 짬뽕", "오키나와 소바", "냉면", "라면", "츠케멘(국물과 면이 따로)", "라면 / 면요리그외", "탄탄면(매콤한 깨소스 라면)", "도삭면(칼로 깎아낸 면)"],
    "전골 요리" : ["전체", "전골 요리", "창코나베(스모 선수들이 주로 먹는 모둠전골)", "미즈타키(일본식 닭 백숙)", "곱창 전골", "훠궈(중국식 전골 요리: 홍탕 & 백탕)", "냄비 요리 그 외"],
    "일식" : ["전체", "정식(세트 메뉴)", "가정 요리", "오뎅", "튀김(덴푸라)", "돈가스", "덮밥류(소고기 덮밥 / 튀김 덮밥 / 닭고기 달걀 덮밥 / 돈가스 덮밥 등)", "오야코동(닭고기 달걀 덮밥)", "규동(소고기 덮밥)", "텐동(튀김 덮밥)", "돈가스 덮밥", "두부 요리", "두부 전골", "도시락", "일본 요리 그 외", "유바 요리(두부 껍질 요리)"]
}


const categoryImage : categoryType = {
  "초밥 /해산물" : ["https://gurunavi.com/static/img/all_category/01_sushi.png"],
  "중식" : ["https://gurunavi.com/static/img/all_category/02_okonomiyaki.png"],
  "고기구이 / 곱창" : ["https://gurunavi.com/static/img/all_category/03_yakiniku.png"],
  "이자카야" : ["https://gurunavi.com/static/img/all_category/04_izakaya.png"],
  "다이닝 바 / 바 / 맥주홀" : ["https://gurunavi.com/static/img/all_category/05_dining_bars.png"],
  "카레" : ["https://gurunavi.com/static/img/all_category/06_curry.png"],
  "라면 / 면요리" : ["https://gurunavi.com/static/img/all_category/07_noodles.png"],
  "전골 요리" : ["https://gurunavi.com/static/img/all_category/08_nabe.png"],
  "일식" : ["https://gurunavi.com/static/img/all_category/09_modern_japanese_cuisine.png"]
}


export default function CategoryModal(props: Omit<UseToggle, "setTrue">) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/search?genre=G001&large_area=Z011&middle_area=Y010&name=個室居酒屋 いろり屋 iroriya 東京駅八重洲店')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <Modal
      open={props.value}
      onClose={props.setFalse}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography variant="h6" textAlign="center" sx={{ my: 2, color: "white", fontWeight: "normal" }}>
          요리 장르
        </Typography>
        <Box sx={modalStyle}>
          <Box sx={{ width: "100%", height: "80px", borderTop: "black dashed 0.7px", borderBottom: "black dashed 0.7px", ...centerStyle, justifyContent: "flex-start" }}>
            <Typography>모든 요리 장르</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "100%", overflow: "auto" }}>
            {Object.keys(categoryTitle).map((category, index) => (
              <Box key={category} sx={{ my: 1, width: "100%",  }}>
                <Button variant="contained" onClick={() => handleCategoryClick(category)} sx={{ bgcolor: "rgb(0,0,0,0.2)", width : "250px", height : "50px", p : 0, display : "flex", justifyContent : "flex-start" }}>
                  {categoryImage[category]?.map((image, imageIndex) => (
                    <img key={imageIndex} src={image} alt="" style={{ marginRight: '8px', width : "65px", height : "50px" }} />
                  ))}
                  {category}
                </Button>
                {selectedCategory === category && (
                  <Box sx={{ m: 3 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      {categoryTitle[category].map((subCategory) => (
                        <Box key={subCategory}>
                          <Button sx={{ whiteSpace: "nowrap" }}>{subCategory}</Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}