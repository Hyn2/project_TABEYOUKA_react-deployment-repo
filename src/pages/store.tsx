import { Box } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import getRestaurant from "../api/getRestaurant.ts";
import type { Restaurant } from "../types/restaurant.interface.ts";
import StoreHeader from "../components/store/header/index.tsx";
import HeaderInfo from "../components/store/header/HeaderInfo.tsx";
import StoreBody from "../components/store/body/index.tsx";
import BodyInfo from "../components/store/body/BodyInfo.tsx";

export default function store() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const [data , setData] = useState<Restaurant>({} as Restaurant);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRestaurant(id);
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
      <Box sx={{ height : "auto", pt : 9 }}>
        <StoreHeader>
          <HeaderInfo data={data} />
        </StoreHeader>
        <StoreBody>
          <BodyInfo data={data} />
        </StoreBody>
      </Box>
  );
}

