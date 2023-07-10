import { Stack } from "@mui/material";
import Story from "./Category";

const Categories = () => {
  return (
    <Stack direction="row" spacing={4} sx={{mb: "30px"}}>
      <Story src="/public/ramen.jpeg" alt="Hyun" title="🍜"/>
      <Story src="/public/steak.webp" alt="Hyun" title="🥩"/>
      <Story src="/public/fukuoka.jpeg" alt="Hyun" title="福岡"/>
    </Stack>
  );
}

export default Categories;