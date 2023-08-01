import { Box, Button, Modal, Typography, useMediaQuery, useTheme } from "@mui/material"
import type { UseToggle } from "../../../types/hooks.interface";
import categoryData from "../../../categoryData.json";
import useGetCode from "../../../hooks/useGetCode";
import { Close } from "@mui/icons-material";

type categoryType = {
    [key : string] : string[]
}

// 해상도 낮은 이미지로 변경할 필요가있음 (불러오는데 오래걸림)
const categoryImage : categoryType = {
    "居酒屋" : ["https://tatsuno-tourism.jp/wp-content/uploads/2021/07/DSC5221.jpg"],
    "ダイニングバー・バル" : ["https://assets.st-note.com/production/uploads/images/45918775/picture_pc_163d84135477f574f21172a0f45f3f65.jpg?width=2000&height=2000&fit=bounds&quality=85"],
    "創作料理" : ["https://www.notoya.co.jp/image/cuisine/aw_sousaku/sd_img01.jpg"],
    "和食" : ["https://www.kobayashi-foods.co.jp/washoku-no-umami/wp-content/uploads/2019/01/wasyoku-scaled.jpeg"],
    "洋食" : ["https://chefkuru.jp/media/wp-content/uploads/2023/02/CHEF2301008-1.png"],
    "中華" : ["https://cdn-ak.f.st-hatena.com/images/fotolife/k/kinniku39/20190514/20190514165819.jpg"],
    "焼肉・ホルモン" : ["https://www.mannoya.com/mannoyawp/wp-content/themes/mannoya_ver1904/img/shop/shop_the_man_mv@2x.jpg"],
    "韓国料理" : ["https://a.cdn-hotels.com/gdcs/production12/d29/cc49915a-a856-4e94-9ba4-c7e89a652d2e.jpg"],
    "アジア・エスニック料理" : ["https://tabizine.jp/wp-content/uploads/2019/03/247147-01.jpg"],
    "各国料理" : ["https://prcdn.freetls.fastly.net/release_image/101028/90/101028-90-83a88b00ff6ba48b35c7576a9d594d99-1800x1200.jpg?format=jpeg&auto=webp&quality=85%2C65&width=1950&height=1350&fit=bounds"],
    "カラオケ・パーティ" : ["https://www.spacemarket.com/wp-content/uploads/2018/11/26225934/e49de1c809713d6a4b9467de81e61053_m.jpg"],
    "バー・カクテル" : ["https://assets-www.leon.jp/image/2018/02/16110948588216/0/shutterstock_225472294_a.jpg"],
    "ラーメン" : ["https://tabizine.jp/wp-content/uploads/2022/03/456100-01.jpg"],
    "お好み焼き・もんじゃ" : ["https://images.keizai.biz/takasaki_keizai/tieup/1666848025/1666848095.jpg"],
    "カフェ・スイーツ" : ["https://san-tatsu.jp/assets/uploads/2022/12/16145320/latte1.jpg"],
    "その他グルメ" : ["https://hugkum.sho.jp/wp-content/uploads/2020/06/23271805_m.jpg"]
  }

const categorys = ["居酒屋", "ダイニングバー・バル", "創作料理", "和食", "洋食", "中華", "焼肉・ホルモン", "韓国料理", "アジア・エスニック料理", "各国料理", "カラオケ・パーティ", "バー・カクテル", "ラーメン", "お好み焼き・もんじゃ", "カフェ・スイーツ", "その他グルメ"];

export default function MiddleLocation(props: Omit<UseToggle, "setTrue"> & {
  setCategory: (category: string) => void,
  setCategoryCode : (value : string) => void,
  }) {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isDownMD ? "100%" : "50%",
    height: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: isDownMD ? 0 : 8,
    overflow: 'auto'
  };
  const handleCategoryClick = (category: string) => {
    props.setCategory(category);
    const code = useGetCode(categoryData, category);
    props.setCategoryCode(code);
    props.setFalse();
  };


  const getImageForCategory = (category : string) => {
    if (category in categoryImage) {
      return categoryImage[category][0];
    }
    return "";
  };

  return (
    <Modal
      open={props.value}
      onClose={props.setFalse}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography variant="h6" textAlign={"center"} sx={{ mt: isDownMD ? 4 : 2, color : "white", fontWeight : "normal" }}>
          요리 장르
        </Typography>
        <Button 
        onClick={props.setFalse}
        sx={{
          position: "absolute",
          right: isDownMD ? "7%" : "24%",
          top: isDownMD ? "3%" : "2%"
        }}>
          <Close htmlColor="white" />
        </Button>
        <Box sx={modalStyle}>
          <Box sx={{ width : "100%" }}>
            {categorys.map((category) => (
              <Box key={category} sx={{ width: "100%" }}>
                <Button variant="contained" onClick={() => handleCategoryClick(category)}
                sx={{ background: `url(${getImageForCategory(category)})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width : "100%",
                height : isDownMD ? "100px" : "50px",
                display : "flex",
                justifyContent : "center",
                textShadow : "1px 1px 1px black",
                fontSize : "20px",
                "&:hover": {height: isDownMD ? "100px" : "400px",transition: "all 0.4s ease-in-out",},
                transition: "height 0.4s ease-in-out"}}>
                  {category}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
