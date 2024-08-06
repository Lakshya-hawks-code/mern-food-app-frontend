import { Order } from "@/types"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem   } from "@/components/ui/select"
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateOrderStatus } from "@/api/MyRestaurantApi"
import { OrderStatus } from "@/types"
import { useEffect, useState } from "react"

type Props = 
{
    order : Order
}

const OrderItem = ({order} : Props) =>
{

   const {updateStatus,isLoading} = useUpdateOrderStatus();
   const [status,setStatus] = useState<OrderStatus>(order.status)

       
   const handleOrderStatusChange = async(newStatus : OrderStatus) =>
   {
      await updateStatus({
         orderId : order._id as string,
         status : newStatus
      })
         setStatus(newStatus);
   }


      useEffect(()=>
      {
         setStatus(order.status)
      },[order.status])
   


    const getTime = () =>
    {
         const created = new Date(order.createdAt);
         
         const hours = created.getHours();
         const minutes = created.getMinutes();

         const paddingMinutes = minutes < 10 ? `0${minutes}` : minutes

         return `${hours}:${paddingMinutes}`
    }
   
   return (
   <Card>
      <CardHeader>
          <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
             <div>
                Customer Name :
                <span className="ml-2 font-normal">
                    {order.deliveryDetails.name}
                </span>
             </div>

             <div>
                Delivery Address :
                <span className="ml-2 font-normal">
                    {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
                </span>
             </div>

             <div>
                Time :
                <span className="ml-2 font-normal">{getTime()}</span>
             </div>

             <div>
                Total Cost :
                <span className="ml-2 font-normal">
                    ${(order.totalAmount / 100).toFixed(2)}
                </span>
             </div>
          </CardTitle>
      </CardHeader>
        <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
               {
                  order.cartItems.map((item) =>(
                    <span>
                        <Badge variant="outline" className="mr-2">
                            {item.quantity}
                        </Badge>
                        {item.name}
                    </span>
                  ))
               }
            </div>

            <div className="flex flex-col space-y-1.5">
               <Label htmlFor="status">What is the status of the order</Label>
                 <Select 
                     value={status}
                     disabled={isLoading}
                     onValueChange={(value) => handleOrderStatusChange(value as OrderStatus)}
                 >
                    <SelectTrigger id="status">
                        <SelectValue placeholder="status">
                        </SelectValue>
                          <SelectContent position="popper">
                              {
                                ORDER_STATUS.map((status) =>(
                                   <SelectItem value={status.value}>{status.label}</SelectItem>
                                ))
                              }
                          </SelectContent>
                    </SelectTrigger>
                 </Select>
            </div>
        </CardContent>
   </Card>
   )
}

export default OrderItem