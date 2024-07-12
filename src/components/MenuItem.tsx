import type { MenuItem as MenuItemType } from "@/types";
import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card"

type Props = 
{
    menuItem : MenuItemType,
    addToCart : () => void
}

const MenuItem = ({menuItem,addToCart} : Props) =>
    {
      return (
          <Card className="cursor-pointer" onClick={addToCart}>
             <CardHeader>
                <CardTitle>
                    {menuItem.name}
                </CardTitle>
             </CardHeader>
             <CardContent className="font-bold">
                ${(menuItem.price / 100).toFixed(2)}
             </CardContent>
          </Card>
      )
    }

    export default MenuItem