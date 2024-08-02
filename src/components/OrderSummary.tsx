import { Restaurant } from "@/types"
import { CartItem } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    CardHeader,
    CardTitle,
    CardContent
  } from "@/components/ui/card"
import { Trash } from "lucide-react"

type Props =
{
    restaurant : Restaurant,
    cartItems : CartItem[],
    removeToCart : (cartItem : CartItem) => void
}

const OrderSummary = ({restaurant,cartItems,removeToCart} : Props) =>
    {
     
      const getTotalCost = () => 
        {
          const totalPence = cartItems.reduce((total,cartItem)=> total + cartItem.price * cartItem.quantity,0)

          
    const totalWithDelivery = totalPence + restaurant?.restaurant?.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
        
        }
          
  
      return (
        <>
           <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
               <span>Your Orders</span>
               <span>${getTotalCost()}</span>
            </CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col gap-5">
             {
                cartItems.map((item)=>(
                    <div className="flex justify-between">
                      <span>
                        <Badge variant="outline" className="mr-2">
                           {item.quantity}
                        </Badge>
                        {item.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trash
                         className="cursor-pointer"
                         color="red"
                         size={20}
                         onClick={() => removeToCart(item)}
                        />
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                ))}
                    <Separator />
                    <div className="flex justify-between">
                      <span>
                        Delivery
                      </span>
                      <span>
                        ${(restaurant?.restaurant?.deliveryPrice / 100).toFixed(2)}
                      </span>
                    </div>
           </CardContent> 
        </>
      )
    }

    export default OrderSummary


