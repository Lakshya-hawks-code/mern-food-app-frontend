import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import {useRestaurantCreate} from "../api/MyRestaurantApi";
import {useGetRestaurant} from "../api/MyRestaurantApi";
import {useUpdateRestaurant} from "../api/MyRestaurantApi";
import { useGetRestaurantOrder } from "../api/MyRestaurantApi";
import OrderItem from "@/components/OrderItem";
import { Tabs, TabsList, TabsTrigger, TabsContent   } from "@/components/ui/tabs"

const ManageRestaurantPage = () =>
{
     const {createRestaurant,isLoading : CreateLoading} = useRestaurantCreate();
     const {getRestaurant} = useGetRestaurant();
     const {updateRestaurant,isLoading : UpdateLoading} = useUpdateRestaurant();
     const {restaurantOrder} = useGetRestaurantOrder();

      const isEditing = !!getRestaurant;
        
      console.log(getRestaurant,"getRestaurant")

     return (
        <Tabs defaultValue="restaurantOrder">
           <TabsList>
               <TabsTrigger value="restaurantOrder">Orders</TabsTrigger>
               <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
           </TabsList>
             <TabsContent value="restaurantOrder" className="space-y-5 bg-gray-50 p-10 rounded-lg">
                <h1 className="text-2xl font-bold">{restaurantOrder?.length} Active Orders</h1>
                  {
                     restaurantOrder?.map((order) =>(
                         <OrderItem order={order}/>
                     ))
                  }
             </TabsContent>
              
             <TabsContent value="manage-restaurant">
             <ManageRestaurantForm
                    restaurant={getRestaurant} 
                    onsave={isEditing ? updateRestaurant : createRestaurant} 
                    isLoading={CreateLoading || UpdateLoading}/>
             </TabsContent>
        </Tabs>
     )
}

export default ManageRestaurantPage;

