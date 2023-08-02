import { Typography } from "@mui/material";

export default function loadingSpinner () {
  return (
    <>
    <div className="spinner"></div>
    <Typography variant="overline">리뷰를 불러오는 중입니다</Typography>
    </>
  )
}