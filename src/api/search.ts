import axios from "axios";
export default async function searchRestaurant(params : any) {
  try {
    const response = await axios.get("http://localhost:8000/api/search", {params: params});
    console.log(response.data.original.shop);
    return response.data.original.shop;
  } catch (error) {
    console.error(error);
  }
}