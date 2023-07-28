import axios from 'axios';
import { RestaurantHOTPP } from '../types/restaurant.interface';

export async function findRestaurant(restuarant_id: string): Promise<RestaurantHOTPP> {
  const response = await axios.get(`http://localhost:8000/api/restaurant/${restuarant_id}`);
  return response.data;
}
