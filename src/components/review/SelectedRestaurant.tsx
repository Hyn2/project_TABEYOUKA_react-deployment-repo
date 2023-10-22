import { RestaurantHOTPP } from '../../types/restaurant.interface';
import { Box, Typography } from '@mui/material';

const SelectedRestaurant = ({ restaurant }: { restaurant: RestaurantHOTPP }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <img style={{ width: '3rem', height: '3rem' }} src={restaurant.photo.pc.s} />
      <Typography>{restaurant.name}</Typography>
    </Box>
  );
};

export default SelectedRestaurant;
