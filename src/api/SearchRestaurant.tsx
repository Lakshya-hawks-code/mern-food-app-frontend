import { useQuery } from "react-query"
const API_BASE_URL = import.meta.env.VITE_AUTH0_BASE_URL
import {SearchRestaurant} from "@/types";
import { SearchState } from "@/pages/SearchPages";

export const useSearchRestaurant = (searchState: SearchState, city?:string) => 
   {
       const createRestaurantRequest = async() : Promise<SearchRestaurant> =>
         {
            const params = new URLSearchParams();
            params.set("searchQuery", searchState.searchQuery);
            params.set("page",searchState.page.toString());
            params.set("selectedCuisine",searchState.selectedCuisines.join(""))
            params.set("sortOption",searchState.sortOption)
            const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/search/${city}?${params.toString()}`,
               {
                  method : "POST",
                  headers:{
                     "Content-Type": "application/json",
                  },
                  body:JSON.stringify({city})
               })
                    if(!response.ok)
                     {
                        throw new Error("Failed to get restaurant")
                     }
                 return response.json();      
         } 

         const {
            data:result,
            isLoading
         } = useQuery(
            ["SearchRestaurant",searchState],
            createRestaurantRequest,
            {enabled:!!city}
         )

         return {
            result,
            isLoading
         }
   }