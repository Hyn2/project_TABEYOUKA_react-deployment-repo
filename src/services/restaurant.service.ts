import axios from 'axios';
import { RestaurantHOTPP } from '../types/restaurant.interface';

export const findRestaurant = async (restuarant_id: string) => {
  console.log(restuarant_id);
  const response = await axios.get(`http://localhost:8000/api/restaurant/${restuarant_id}`);
  console.log(response.data);
  return response.data;
};
