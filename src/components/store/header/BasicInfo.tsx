import { AccessTime, CurrencyYen, DinnerDining, LocationOn } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { StoreHeaderInfoProps } from '../../../types/restaurant.interface';

const BasicInfo = ({data} : StoreHeaderInfoProps) => {

  const infoList = [
    { icon: <DinnerDining />, content: data.genre?.name },
    { icon: <CurrencyYen />, content: `平均 ${data.budget?.name}` },
    { icon: <AccessTime />, content: data.open },
    { icon: <LocationOn />, content: data.access },
  ];

  return (
    <>
      {infoList.map((item, index) => (
      <Box key={index} sx={{ width : "100%", height : "30px", display : "flex", alignItems : "center" }}>
        {item.icon}
        <Typography sx={{ fontSize: "19px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.content}
        </Typography>
      </Box>
      ))}
    </>
  )
}

export default BasicInfo