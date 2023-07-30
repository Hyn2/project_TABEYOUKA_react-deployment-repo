import { Box, Rating, Skeleton, Typography } from '@mui/material';
import { RestaurantDB, RestaurantHOTPP } from '../../types/restaurant.interface';
import { useEffect, useState } from 'react';
import { findRestaurant } from '../../services/restaurant.service';
import { getRoughDistance } from '../../utils/distances';

interface RestaurantBannerProps {
  data: RestaurantDB;
  size?: 'small' | 'medium' | 'large';
}

const RestaurantBanner = ({ data, size = 'medium' }: RestaurantBannerProps) => {
  const [restaurant, setRestaurant] = useState<RestaurantHOTPP>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>();
  navigator.geolocation.getCurrentPosition((pos) => {
    setLocation({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
  });

  const sizeImage = () => {
    switch (size) {
      case 'small':
        return restaurant?.photo.pc.s;
      case 'medium':
        return restaurant?.photo.pc.m;
      case 'large':
        return restaurant?.photo.pc.l;
    }
  };

  const fetchRestaurant = () => {
    findRestaurant(data.id).then((data) => {
      setRestaurant(data);
    });
  };

  useEffect(() => fetchRestaurant, []);

  return restaurant ? (
    <Box
      border="1px solid rgba(1, 1, 1, 0.2)"
      borderRadius={2}
      p={1}
      display="flex"
      alignItems="center"
      gap={2}
    >
      {/* head */}
      <Box>
        {/* restaurant thumb  */}
        <img src={sizeImage()} alt="restaurant_photo" />
      </Box>

      <Box>
        {/* title */}
        <Typography fontSize={size} fontWeight={600}>
          {restaurant?.name}
        </Typography>

        {/* address */}
        {size !== 'small' ? (
          <>
            <Typography fontSize={size}>{restaurant?.address}</Typography>
            {location?.latitude && location?.longitude ? (
              <Typography fontSize={size}>
                {getRoughDistance(
                  location?.latitude,
                  location?.longitude,
                  restaurant.lat,
                  restaurant.lng
                )}
              </Typography>
            ) : null}
          </>
        ) : null}

        {/* genre */}
        <Typography fontSize={size}>{restaurant?.genre.name}</Typography>

        {/* score */}
        <Rating value={5} readOnly size={size} />
      </Box>
    </Box>
  ) : (
    <Skeleton variant="rectangular" height={200} animation="wave" />
  );
};

export default RestaurantBanner;
