import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order, Restaurant } from "@/types";

const API_BASE_URL = import.meta.env.VITE_AUTH0_BASE_URL;

export const useRestaurantCreate = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/create-restaurant`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Restaurant not created!');
    }

    const data = await response.json();
    return data.restaurant;
  };
     
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation(createMyRestaurantRequest);


  if (isSuccess) {
    toast.success('Restaurant created successfully');
  }

  if (isError) {
    toast.error('Unable to create restaurant');
  }

  return {
    createRestaurant,
    isLoading,
    error,
  };
};


 export const useGetRestaurant = () =>
 {
  const {getAccessTokenSilently} = useAuth0();

  const getRestaurantRequest = async() =>
  {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/find-restaurant`,
      {
        method:"POST",
        headers:
        {
             Authorization : `Bearer ${accessToken}`
        }
      })

      if(!response.ok)
      {
        throw new Error("restaurant not found!")
      }

      const data = await response.json();
        return data.restaurant;
  }

  const 
  {
    data: getRestaurant,
          isLoading,
          isError,
          error
  }  = useQuery("fetchRestaurant", getRestaurantRequest)
  

            if(error)
                 {
                   toast.error(error.toString());
                 }

          return {
            getRestaurant,
            isLoading,
            isError,
          }
 }


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






export const useGetRestaurantOrder = () => 
{
  const {getAccessTokenSilently} = useAuth0();
  const getRestaurantOrder = async() : Promise<Order[]>  =>
  {
       const accessToken = await getAccessTokenSilently();

       const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/find-restaurant-order`,
        {
          method : "POST",
          headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${accessToken}`
          }
        })

        if(!response.ok)
        {
          throw new Error("Restaurant order not found!");
        }

        const data = await response.json();
        return data.order;   
  }

  const {
     data : restaurantOrder,
            isLoading,
  }  = useQuery("getRestaurantOrder",getRestaurantOrder)

  return {
    restaurantOrder,
    isLoading,
  }
}





type OrderStatusUpdate = 
{
  orderId : string,
  status : string
}


export const useUpdateOrderStatus = () =>
{
  const {getAccessTokenSilently} = useAuth0();

  const updateOrderStatus = async(statusOrderUpdate : OrderStatusUpdate) =>
  { 
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/v1/restaurant/order-status/${statusOrderUpdate.orderId}`,
        {
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${accessToken}`
          },
          body:JSON.stringify({status : statusOrderUpdate.status})
        })

        if(!response.ok)
        {
          throw new Error("Order status not update!")
        }

        const data = await response.json();
        return data.order;
  }

  const {
    mutateAsync : updateStatus,
                 isLoading,
                 isSuccess,
                 isError,
                 reset
  } =  useMutation(updateOrderStatus)

  if(isSuccess)
  {
    toast.success("Order status update successfully")
  }

  if(isError)
  {
    toast.error("Order status update failed!");
    reset();
  }

   
  return {
    updateStatus,
    isLoading
  }
}