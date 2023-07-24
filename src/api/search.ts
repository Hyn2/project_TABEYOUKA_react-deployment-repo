import axios from "axios";
export default async function searchRestaurant(params : any) {
  try {
    const response = await axios.get("http://localhost:8000/api/search", {params: params});
    console.log(response);
    if (params.count === 100) {
      return response.data.original.results_available
    }
    return response.data.original.results;
  } catch (error) {
    console.error(error);
  }
}