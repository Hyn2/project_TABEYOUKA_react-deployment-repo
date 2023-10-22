import axios from 'axios';
import { RestaurantHOTPP } from '../types/restaurant.interface';

export async function findRestaurant(restuarant_id: string): Promise<RestaurantHOTPP> {
  const response = await axios.get(`http://localhost:8000/api/restaurant/${restuarant_id}`);
  const data = response.data.shop[0];
  return data;
}

export async function findNearbyRestaurant(
  lat: number,
  lng: number,
  count?: number
): Promise<RestaurantHOTPP[]> {
  const response = await axios.get(`http://localhost:8000/api/search/nby?lat=${lat}&lng=${lng}`);

  const restaurants = response.data.original.shop.slice(0, count || 10);

  return restaurants;
}
