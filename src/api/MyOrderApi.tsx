import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order } from "@/types";

const API_BASE_URL = import.meta.env.VITE_AUTH0_BASE_URL;



type CheckOutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckOutSessionRequest) => {
    const accessToken = await getAccessTokenSilently();
        
    const response = await fetch(`${API_BASE_URL}/api/v1/order/create-checkout-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutSessionRequest),
    });
    
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Unable to create checkout session");
    }
    console.log(response,"response")
    return response.json();   
          
  };
  const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    createCheckoutSession,
    isLoading,
  };
};









export const useGetUserOrder = () => 
{
  const {getAccessTokenSilently} = useAuth0();

  const getUserOrder = async():Promise<Order[]> => {

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/v1/order/get-order`,{
      method : "POST",
      headers: {
          Authorization: `Bearer ${accessToken}`,
         "Content-Type": "application/json",
      }
    })
       if(!response.ok)
       {
        throw new Error("Failed to find a user order");
       }
          const data = await response.json();
          return data.order;
  }
  


  const {
      data : getOrder,
                   isLoading,
      
                  error,
  } = useQuery("getUserOrder",getUserOrder,
    {
      refetchInterval : 5000
    }
  )
       console.log(getOrder,"getOrder")
    return {
      getOrder,
      isLoading,
      error,
      
    }
}
