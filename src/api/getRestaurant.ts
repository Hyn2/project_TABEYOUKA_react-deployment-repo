import axios from "axios";
import { Restaurant } from "../types/restaurant.interface";
export default async function getRestaurant(id: string | null){
    try {
      const response = await axios.get(
        `http://localhost:8000/api/restaurant/${id}`
      );
      return response.data.shop[0];
    } catch (error) {
      console.error(error);
    }
  }