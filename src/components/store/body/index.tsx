import { Box, Container} from "@mui/material";
import type { IProps } from "../../../types/common.interface";

export default function StoreBody({ children } : IProps) {
  return (
    <Box
    sx={{
      width: "100%",
      height: "auto",
      bgcolor: "#F7F5EF",
      pt: 5,
    }}
    >
      <Container maxWidth="lg" sx={{ height: "auto" }}>
        {children}
      </Container>
    </Box>
  );
}
