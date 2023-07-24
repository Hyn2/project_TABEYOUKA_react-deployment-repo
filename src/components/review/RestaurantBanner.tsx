import { Box, Rating, Skeleton, Typography } from '@mui/material';
import { RestaurantDB, RestaurantHOTPP } from '../../types/restaurant.interface';
import { useEffect, useState } from 'react';
import { findRestaurant } from '../../services/restaurant.service';

const RestaurantBanner = ({ data }: { data: RestaurantDB }) => {
  const [restaurant, setRestaurant] = useState<RestaurantHOTPP>();

  const fetchRestaurant = () => {
    findRestaurant(data.id).then((data) => {
      setRestaurant(data);
    });
  };

  useEffect(() => fetchRestaurant, []);

  return restaurant ? (
    <Box border="1px black solid" display="flex">
      {/* head */}
      <Box>
        {/* restaurant thumb  */}
        <img src={restaurant?.shop[0].photo.pc.m} alt="restaurant_photo" />
      </Box>

      <Box>
        {/* title */}
        <Typography fontWeight={600}>{restaurant?.shop[0].name}</Typography>

        {/* address */}
        <Typography fontSize="0.9rem">{restaurant?.shop[0].address}</Typography>

        {/* genre */}
        <Typography fontSize="0.9rem">{restaurant?.shop[0].genre.name}</Typography>

        {/* score */}
        <Rating value={5} readOnly sx={{ bottom: 0 }}></Rating>
      </Box>
    </Box>
  ) : (
    <Skeleton variant="rectangular" height={200} animation="wave" />
  );
};

export default RestaurantBanner;
