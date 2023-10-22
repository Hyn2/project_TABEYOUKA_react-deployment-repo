import { useEffect, useState } from 'react';
import { RestaurantHOTPP } from '../../../types/restaurant.interface';
import { findNearbyRestaurant } from '../../../services/restaurant.service';
import { Box, Button, CircularProgress, Modal, Skeleton, SxProps, Typography } from '@mui/material';
import { UseToggle } from '../../../types/hooks.interface';
import SelectedRestaurant from '../SelectedRestaurant';

const modalContainerStyle: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  height: '30rem',

  display: 'flex',
  flexDirection: 'column',

  transition: 'all 300ms ease-out',

  bgcolor: 'background.paper',
  borderRadius: '12px',
  border: '1px solid #BBBBBB',
  boxShadow: 24,
  p: 2,

  // mobile interactive design
  '@media (max-width: 840px)': {
    width: '100%',
    height: '100%',
  },

  '@media (max-height: 500px)': {
    width: '100%',
    height: '100%',
  },
};

interface RestaurantSelectorProps extends Omit<UseToggle, 'setTrue'> {
  selectedRestaurant: RestaurantHOTPP | null;
  restaurantHandler: (restaurant: RestaurantHOTPP | null) => void;
}

const RestaurantSelector = ({
  value,
  setFalse,
  selectedRestaurant,
  restaurantHandler,
}: RestaurantSelectorProps) => {
  const [restaurants, setRestaurants] = useState<RestaurantHOTPP[]>();

  const fetchRestaurants = (pos: GeolocationPosition) => {
    // FIXME: test pos = { coords: { latitude: 33.5933694, longitude: 130.3949425 } };
    findNearbyRestaurant(33.5933694, 130.3949425, 5).then((data) => {
      setRestaurants(data);
    });
  };

  const handleSelect = (restaurant: RestaurantHOTPP) => {
    restaurantHandler(restaurant);
    setFalse();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchRestaurants, (err) => console.error(err));
  }, []);

  return (
    <Modal
      open={value}
      onClose={setFalse}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalContainerStyle}>
        <Box>
          <Button onClick={setFalse}>{`<  back`}</Button>
        </Box>
        {selectedRestaurant ? (
          <Box>
            <Typography>{selectedRestaurant.name}</Typography>
            <Button size="small" onClick={() => restaurantHandler(null)}>
              ほかのレストラン…
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography fontSize="small">近くのレストラン</Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {restaurants ? (
                restaurants.map((restaurant, i) => (
                  <Box key={i} sx={{ width: '100%', cursor: 'pointer' }}>
                    <Button onClick={() => handleSelect(restaurant)}>
                      <SelectedRestaurant restaurant={restaurant} />
                    </Button>
                  </Box>
                ))
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default RestaurantSelector;
