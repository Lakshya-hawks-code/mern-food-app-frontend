import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"
import {useUpdateUser,useGetUser} from "../api/MyUserApi";



const UserProfilePage = () =>
    {
        const {updateuser,isLoading : isUpdateLoading} = useUpdateUser();
        const {getuser,isLoading : isGetLoading,isError} = useGetUser();

        if(isGetLoading)
            {
                return <span>Loading...</span>
            }
            if(isError || !getuser)
                {
                    return <span>Unable to load user profile</span>
                }
                console.log(getuser)
         return (
            <UserProfileForm getUsetuser ={getuser} onsave={updateuser} isLoading = {isUpdateLoading} />
         )
    }
    
    export default UserProfilePage 