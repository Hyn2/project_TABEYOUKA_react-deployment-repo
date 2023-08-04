import { Box, Button, Modal, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { UseToggle } from "../../../types/hooks.interface";
import type { Restaurant } from "../../../types/restaurant.interface";
import { useEffect, useState } from "react";
import useInput from "../../../hooks/useInput";
import {Storefront, LocationOn} from "@mui/icons-material";
import searchRestaurant from "../../../api/search";
import locationData from "../../../locationData.json";
import React from "react";
import useGetCode from "../../../hooks/useGetCode";
import middleArea from "../../../middleArea.json";

const modalStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  bgcolor: "#EEEEEE",
  pb: 5,
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function RestaurantModal(
  props: Omit<UseToggle, "setTrue"> & {
    purpose: string;
    setRestaurant: (category: string) => void;
  }) {
  const theme = useTheme();
  const isDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const textInput = useInput("");
  // 데이터받아서 state에 저장 state만큼 map돌려서 뿌려주기
  const [titles, setTitle] = useState<string[]>([]);
  const [location, setLocation] = useState<{ [key: string]: string[] }>({});
  useEffect(()=>{
    if(props.purpose === "restaurant" && textInput.value) {
      const getData = async () => {
        const params = {
          name : textInput.value,
          genre: "",
          area: "",
          lat: "",
          lng: "",
          start: 1,
          count: 10,
        }
        const data: Restaurant[] | undefined = await searchRestaurant(params);
        console.log(data)
        if(data) {
          console.log(data);
          const names: string[] = data.map((item) => item.name);
          console.log(names);
          setTitle(names);
        } else {
          setTitle([]);
        }
      }
      getData()
    }
    if(props.purpose === "location") {
      const params = {
        name : textInput.value
      }
      console.log(params.name.length)
      const filteredLocation = Object.fromEntries(
        Object.entries(locationData).filter(([key]) => key.includes(params.name) && params.name.length > 0)
      );
      setLocation(filteredLocation);
    }
    
  },[textInput.value])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.setRestaurant(textInput.value);
  };

  const onClickRestaurant = (title : string) => {
    props.setRestaurant(title);
    props.setFalse();
  };

  const onClickLocation = (title : string) => {
    const code = useGetCode(middleArea, title);
    console.log(code);
    props.setRestaurant(code);
  };
  if (props.purpose === "restaurant") {
    return (
      <Modal
        open={props.value}
        onClose={props.setFalse}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ ...centerStyle, bgcolor: "white", width: "100%", height: "5%" }}
          >
            <Box sx={{ ...centerStyle, width: "55%", height: "100%" }}>
              <Box sx={{ width: isDownMD ? "10%" : "5%", height: "100%" }}>
                <Button
                  onClick={props.setFalse}
                  sx={{ p: 0, minWidth: "100%", height: "100%" }}
                >
                  <ArrowBackIcon />
                </Button>
              </Box>
  
              <Box sx={{ width: "95%", height: "100%" }}>
                <form onSubmit={onSubmit}>
                  <TextField
                    label="レストラン名"
                    variant="standard"
                    color="success"
                    {...textInput}
                    sx={{ width: "100%" }}
                  />
                </form>
              </Box>
            </Box>
          </Box>
  
          <Box sx={{ ...centerStyle, width: "100%", height: "10%" }}>
            <Box sx={{ width: isDownMD ? "100%" : "53%", height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  bgcolor: "white",
                  width: "100%",
                  height: "auto",
                  my: 1,
                  px: 2,
                  boxShadow: "5px 5px 5px #C2C2C2",
                  flexDirection: "column",
                }}
              >
                {titles.map((title, index) => (
                  <Box key={index} sx={{ width: "100%", height: "70px", borderBottom: "#C2C2C2 1px dashed"}}>
                    <Button key={index} onClick={() => onClickRestaurant(title)} sx={{ width: "100%", height: "100%", py: 1, display: "flex" }}>
                      <Box sx={{ width: "2%", height: "100%", display: "flex", alignItems: "center" }}>
                        <Storefront sx={{ fontSize: "16px"}} />
                      </Box>
                      <Box sx={{ width: "98%", height: "100%", textAlign: "left", display: "flex", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "12px", color: "black", ml: 2 }}>
                          {title}
                        </Typography>
                      </Box>
                    </Button>
                  </Box>
                ))}
                
                <Box sx={{ width: "100%", height: "50px", p: 1 }}>
                  <Typography sx={{ fontSize: "14px", color: "#787A91" }}>
                    フリーワードで検索する '{textInput.value}'
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
  if (props.purpose === "location") {
    return (
      <Modal
        open={props.value}
        onClose={props.setFalse}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ ...centerStyle, bgcolor: "white", width: "100%", height: "5%" }}
          >
            <Box sx={{ ...centerStyle, width: "55%", height: "100%" }}>
              <Box sx={{ width: isDownMD ? "10%" : "5%", height: "100%" }}>
                <Button
                  onClick={props.setFalse}
                  sx={{ p: 0, minWidth: "100%", height: "100%" }}
                >
                  <ArrowBackIcon />
                </Button>
              </Box>
  
              <Box sx={{ width: "95%", height: "100%" }}>
                <form onSubmit={onSubmit}>
                  <TextField
                    label="都道府県"
                    variant="standard"
                    color="success"
                    {...textInput}
                    sx={{ width: "100%" }}
                  />
                </form>
              </Box>
            </Box>
          </Box>
  
          <Box sx={{ ...centerStyle, width: "100%", height: "100%" }}>
            <Box sx={{ width: isDownMD ? "100%" : "53%", height: "100%", overflow: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  bgcolor: "white",
                  width: "100%",
                  height: "auto",
                  my: 1,
                  p: 1,
                  boxShadow: "5px 5px 5px #C2C2C2",
                  flexDirection: "column",
                  
                }}
              >
                {Object.entries(location).map(([title, items]) => (
                  <React.Fragment key={title}>
                    {/* 하위 항목 렌더링 */}
                    {items.map((item, index) => (
                      <Box key={index} sx={{ width: "100%", height: "70px", borderBottom: "#C2C2C2 1px dashed"}}>
                        <Button onClick={() => onClickLocation(item)} sx={{ width: "100%", height: "100%", py: 1, display: "flex" }}>
                          <Box sx={{ width: "2%", height: "100%", display: "flex", alignItems: "center" }}>
                            <LocationOn sx={{ fontSize: "16px"}} />
                          </Box>
                          <Box sx={{ width: "98%", height: "100%", textAlign: "left", display: "flex", alignItems: "center" }}>
                            <Typography sx={{ fontSize: "12px", color: "black", ml: 2 }}>
                              {item}
                            </Typography>
                          </Box>
                        </Button>
                      </Box>
                    ))}
                  </React.Fragment>
                ))}

                
                <Box sx={{ width: "100%", height: "50px", p: 1 }}>
                  <Typography sx={{ fontSize: "14px", color: "#787A91" }}>
                    フリーワードで検索する '{textInput.value}'
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
  
}
