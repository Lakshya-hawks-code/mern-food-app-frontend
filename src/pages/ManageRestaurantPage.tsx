import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import {useRestaurantCreate} from "../api/MyRestaurantApi";
import {useGetRestaurant} from "../api/MyRestaurantApi";
import {useUpdateRestaurant} from "../api/MyRestaurantApi";

const ManageRestaurantPage = () =>
{
     const {createRestaurant,isLoading : CreateLoading} = useRestaurantCreate();
     const {getRestaurant} = useGetRestaurant();
     const {updateRestaurant,isLoading : UpdateLoading} = useUpdateRestaurant();

      const isEditing = !!getRestaurant;

     return (
     <ManageRestaurantForm
     restaurant={getRestaurant} 
      onsave={isEditing ? updateRestaurant : createRestaurant} 
      isLoading={CreateLoading || UpdateLoading}/>
     )
}
export default ManageRestaurantPage;

