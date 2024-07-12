import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_AUTH0_BASE_URL;

type CheckOutSessionRequest = {
    CartItem: {
        menuItemId: string,
        name: string,
        quantity: string,
    }[];

    deliveryDetails: {
        email: string,
        name: string,
        addressLine1: string,
        city: string,
    }
    restaurantId: string;
}



export const useCreateCheckoutSession = () => {
    const {getAccessTokenSilently} = useAuth0();

    const createCheckoutSession = async (checkoutSession : CheckOutSessionRequest) =>{
         const accessToken = await getAccessTokenSilently()

         const response = await fetch(`${API_BASE_URL}/api/v1/order/create-checkout-session`,
            {
                method : "POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization : `${accessToken}`   
                },
                body:JSON.stringify(checkoutSession)
            });

            if(!response)
            {
                throw new Error("Create checkout session not create");
            }
               return response.json();
    }

      const {
        mutateAsync : checoutSession,
                     isLoading,
                     error,
                     reset
      } = useMutation(createCheckoutSession)


        if(error)
        {
            toast.error(error.toString());
        }

      return {
        checoutSession,
        isLoading,
        error,
        reset
      }
}