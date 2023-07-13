import { Typography } from "@mui/material";

interface counterProps {
  title: string,
  count: number,
}

const Counter = ({title, count} : counterProps) => {
  return (
    <Typography component="a" href="#"sx={{textDecoration: "none", color: "inherit", mr: "30px"}}>{title}
      <Typography component="span" sx={{fontWeight: "bold"}}>{count}</Typography>
    </Typography>
  )
}

export default Counter;