import { useGetRestaurant } from "@/api/SearchRestaurant"
import { useParams } from "react-router-dom"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItem from "@/components/MenuItem";
import { MenuItem as MenuItemType,CartItem } from "@/types";
import { useState } from "react";
import {Card, CardFooter} from "@/components/ui/card"
import OrderSummary from "@/components/OrderSummary";
import { CartItem as  CartItemType} from "@/types";
import CheckOutButton from "@/components/CheckOutButton";
import {UserFormData} from "@/forms/user-profile-form/UserProfileForm";
import {useCreateCheckoutSession} from "../api/MyOrderApi";



const DetailPage = () => {
    const { restaurantId } = useParams();
    const {  restaurant, isLoading } = useGetRestaurant(restaurantId);
    const {createCheckoutSession, isLoading : isCheckOutLoading} = useCreateCheckoutSession();

    const [cartItem,setCartItem] = useState<CartItem[]>(()=>{
      const storeCartItem = sessionStorage.getItem(`cartItem_${restaurantId}`);
      return storeCartItem ? JSON.parse(storeCartItem) : []
    })

    if (isLoading || !restaurant) {
        return "Loading...";
    }


    // Add To Cart Function
    
    const addToCart = (menuItem: MenuItemType) => {
      setCartItem((prevCartItems) => {
        const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);
    
        let updatedCartItems: CartItemType[];
    
        if (existingCartItem) {
          updatedCartItems = prevCartItems.map((cartItem) =>
            cartItem._id === menuItem._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          updatedCartItems = [
            ...prevCartItems,
            {
              _id: menuItem._id,
              name: menuItem.name,
              price: menuItem.price,
              quantity: 1,
            },
          ];
        }
                   
      // Store Item in addCart Time in  session Storage

        sessionStorage.setItem(`cartItem_${restaurantId}`,JSON.stringify(updatedCartItems))
         
        return updatedCartItems;
      });
    };



     // Remove to Cart Function
      
      const removeToCart = (cartItem : CartItemType) => {
        setCartItem((prevState) => {
          const updatedCartItems = prevState.filter((item) => cartItem._id !== item._id)

          // Store Item in removeCart Time in  session Storage

          sessionStorage.setItem(`cartItem_${restaurantId}`,JSON.stringify(updatedCartItems))

          return updatedCartItems
        })
      }; 



      

      // Checkout function to using a payment gateway method

      const onCheckOut = async(userFromdata : UserFormData) => {
        if(!restaurant)
          return

     const checkOutData = {
      cartItems : cartItem?.map((cartItems) =>({
        menuItemId : cartItems._id,
        name : cartItems.name,
        quantity :cartItems.quantity.toString()
      })),
      restaurantId : restaurant?.restaurant?._id,
      deliveryDetails : {
        email : userFromdata.email as string,
        name : userFromdata.name,
        addressLine1 : userFromdata.addressLine1,
        city : userFromdata.city,
        country : userFromdata.country, 
      },
     };

         // Data are successfully get to the redirect in a payment page 
         
      const data = await createCheckoutSession(checkOutData);
      window.location.href = data.url;
         
        if(isLoading || !restaurant)
        {
          return "Loading..."
        }
      }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 9}>
                <img 
                    src={restaurant.imageUrl}  
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
              <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                  <RestaurantInfo restaurant={restaurant}/>
                  <span className="text-2xl font-bold tracking-tight">
                    Menu
                  </span>
                  {restaurant?.restaurant?.menuItems?.map((menuItem : MenuItemType)=>(
                      <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)}/>
                  ))}
                </div>
                <div>
                  <Card>
                     <OrderSummary restaurant={restaurant} cartItems={cartItem} removeToCart={removeToCart}/>

                     <CardFooter>
                           <CheckOutButton 
                           onCheckOut={onCheckOut} 
                           isLoading={isCheckOutLoading} 
                           disabled={cartItem.length === 0}
                           />
                      </CardFooter>
                  </Card>
                </div>
              </div>
        </div>
    );
};

export default DetailPage;


