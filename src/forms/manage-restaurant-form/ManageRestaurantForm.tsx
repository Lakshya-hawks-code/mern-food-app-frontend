import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";



const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant Name is required"
    }),
    city: z.string({
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required" 
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery Price is required",
        invalid_type_error: "must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least one item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"]
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    restaurant?:Restaurant
    onsave: (restaurantFormData: FormData) => void,
    isLoading: boolean,
};

const ManageRestaurantForm = ({ onsave, isLoading,restaurant  }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    });


     
           
          useEffect(() =>{
            if(!restaurant)
                {
                       return;
                }
                const restaurantNameFormatted = restaurant.restaurant.restaurantName;
                const restaurantCityFormatted = restaurant.restaurant.city;
                const restaurantCountryFormatted = restaurant.restaurant.country;
                const restaurantDeliveryPriceFormatted = parseInt((restaurant.restaurant.deliveryPrice / 100).toFixed(2));
                const restaurantestimatedDeliveryTimeFormatted = restaurant.restaurant.estimatedDeliveryTime;
                const restaurantcuisinesFormatted = restaurant.restaurant.cuisines;
                const restaurantmenuItemsFormatted = restaurant.restaurant.menuItems.map((item) => ({
                    price: parseInt((item.price / 100).toFixed(2)),
                    name: item.name
                }))
                 const restaurantImageFormatted = restaurant.restaurant.imageUrl;
                const updateRestaurant = {
                    ...restaurant,
                    restaurantName : restaurantNameFormatted,
                    city : restaurantCityFormatted,
                    country : restaurantCountryFormatted,
                    deliveryPrice : restaurantDeliveryPriceFormatted,
                    estimatedDeliveryTime : restaurantestimatedDeliveryTimeFormatted,
                    cuisines : restaurantcuisinesFormatted,
                    menuItems : restaurantmenuItemsFormatted,
                    imageUrl : restaurantImageFormatted
                }
                form.reset(updateRestaurant);
               
          },[form,restaurant])
  


           
      
          


    const onSubmit = (formDataJson: RestaurantFormData) => {
        // Convert FormDataJson To FormDataObject
        const formData = new FormData();
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
        
        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });

        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
        });

        if (formDataJson.imageFile) {
            formData.append("imageFile", formDataJson.imageFile);
        }

        onsave(formData);
    };
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
            </form>
        </Form>
    );
};

export default ManageRestaurantForm;





