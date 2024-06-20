import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_AUTH0_BASE_URL;

// Create Restaurant Function
const createMyRestaurant = async (restaurantFormData: FormData, accessToken: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/create-restaurant`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
    });

    if (!response.ok) {
        throw new Error("Failed to create restaurant!");
    }
    
    return response.json();
};
// Restaurant Create Api
export const useRestaurantCreate = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData)=> {
        const accessToken = await getAccessTokenSilently();
        return createMyRestaurant(restaurantFormData, accessToken);
    };

    const {
        mutate: createRestaurant,
        isLoading,
        isSuccess, 
        error,
    } = useMutation(createMyRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created successfully!");
    } 
    if (error) {
        toast.error("Unable to create restaurant");
    }

    return { 
        createRestaurant,
         isLoading,
          isSuccess,
           error 
        };
};





// get Restaurant Function
const getRestaurantRequest = async (accessToken: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/find-restaurant`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch Restaurant");
    }
  
    return response.json();
  };
  
  // Get Restaurant Api
  export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const fetchRestaurant = async () => {
      const accessToken = await getAccessTokenSilently();
      return getRestaurantRequest(accessToken);
    };   
    const {
      data:getRestaurant,  
       isLoading, 
       isError, 
        error
       } = useQuery("fetchRestaurant", fetchRestaurant);
      
          if(error)
            {
              toast.error(error.toString());
            }
  
    return {
     getRestaurant,
      isLoading,
      isError,
    };
  };



const updateRestaurantRequest = async(restaurantFormData:FormData,accessToken:string) =>
  {
     const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/update-restaurant`,
      {
        method:"POST",
        headers:
        {
          Authorization : `Bearer ${accessToken}`
        },
        body:restaurantFormData
      })
      if(!response.ok)
        {
          throw new Error("Unable to update resturant!")
        }
        return response.json();
  }
 
  
export const useUpdateRestaurant = () =>
  {
    const {getAccessTokenSilently} = useAuth0();

    const createMyRestaurantRequest = async(restaurantFormData:FormData) =>
      {
        const accessToken = await getAccessTokenSilently();
        return updateRestaurantRequest(restaurantFormData, accessToken)
      }
      const {
        mutate : updateRestaurant,
                 isLoading,
                 isSuccess,
                 error,
      } = useMutation(createMyRestaurantRequest)   
      
      if(isSuccess)
        {
          toast.success("Restaurant update successfully!")
        }
        if(error)
          {
            toast.error("Failed to update restaurant!")
          }
      return {
                 updateRestaurant,
                 isLoading,
                 isSuccess,
                 error,
      }
  }