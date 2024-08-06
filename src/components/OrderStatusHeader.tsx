import { Order } from "@/types";
import { Progress } from "@/components/ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = 
{
    order : Order
} 

const OrderStatusHeader = ({order} : Props) => 
{
    
    const getExpectedByDelivery = () => 
    {
        const created = new Date(order.createdAt);

        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime)
            
        const hours = created.getHours();
        const minutes = created.getMinutes();

        // Hours = 12
        // Minutes = 2
        // 12:2
        //12:02

         const paddedMintes = minutes < 10 ? `0${minutes}` : minutes

         return `${hours}:${paddedMintes}`     // 12:02
    }




    const getOrderStatus = () => {
        return (
            ORDER_STATUS.find((orderStatus) => orderStatus.value === order.status) || ORDER_STATUS[0]
        )
    }

   return (
    <>
        <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
            <span>Order Status : {getOrderStatus().label}</span>
            <span>Expected By : {getExpectedByDelivery()}</span>
        </h1>
        <Progress className="animate-pulse" value={getOrderStatus().progressValue} />
    </>
   )
}

export default OrderStatusHeader;