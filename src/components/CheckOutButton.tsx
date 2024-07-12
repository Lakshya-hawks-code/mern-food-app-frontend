import UserProfileForm,{UserFormData} from "@/forms/user-profile-form/UserProfileForm"
import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom";
import {Button} from "@/components/ui/button";
import { useGetUser } from "@/api/MyUserApi";
import LoadingButton from "./LoadingButton";
import {Dialog,DialogTrigger,DialogContent} from "@/components/ui/dialog"

type Props = {
    onCheckOut : (userformdata : UserFormData) => void,
    isLoading : boolean,
    disabled : boolean,
}



const CheckOutButton = ({onCheckOut,isLoading,disabled} : Props) => {

    const {getuser,isLoading:isGetUerLoading} = useGetUser();

    const {isAuthenticated,loginWithRedirect,isLoading:isAuthLoading} = useAuth0();

    const {pathname} = useLocation()

  const Login = async() =>
  {
    await loginWithRedirect({
        appState :{
            returnTo : pathname
        }
    })
  } 
  
  if(!isAuthenticated) {
    return (
       <Button className="bg-orange-500 flex-1" onClick={Login}>
        Log in to Check out
       </Button>
    )
  }

    
  if(isAuthLoading || isLoading || !getuser){
    return <LoadingButton/>
  }
       

    return (

         <Dialog>
             <DialogTrigger asChild>
                <Button className="bg-orange-500 flex-1" disabled={disabled}>Go To CheckOut</Button>
             </DialogTrigger>
             <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
             <UserProfileForm
                  getUsetuser = {getuser}
                  onsave={onCheckOut}
                 isLoading = {isGetUerLoading}
                 title = "Confirm delivery details"
                 buttonText = "Contiune to payment"
                    />
             </DialogContent>
         </Dialog>
       
    )
}

export default CheckOutButton