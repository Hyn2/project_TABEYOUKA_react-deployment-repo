import { Typography } from "@mui/material";

export default function loadingSpinner () {
  return (
    <>
    <div className="spinner"></div>
    <Typography variant="overline">レビューロード中</Typography>
    </>
  )
}