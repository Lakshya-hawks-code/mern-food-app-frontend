
import { Restaurant } from "@/types";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
    return (
        <Card className="border-sla">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight">
                    {restaurant?.restaurant?.restaurantName}
                </CardTitle>
                <CardDescription>
                    {restaurant?.restaurant?.city} , {restaurant?.restaurant?.country}
                </CardDescription> 
            </CardHeader>
            <CardContent className="flex">
        {restaurant?.restaurant?.cuisines?.map((item:string, index:number) => (
          <span className="flex">
            <span>{item}</span>
            {index < restaurant?.restaurant?.cuisines?.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
        </Card>
    );
};

export default RestaurantInfo;
