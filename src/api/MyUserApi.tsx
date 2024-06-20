import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_AUTH0_BASE_URL

type CreateMyUser = 
{
    auth0Id: string,
    email: string
}

 // Create User Function
 const createUserRequest = async (user: CreateMyUser, accessToken:string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/user/create-user`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}` 
      },
      body: JSON.stringify(user)
    });
    
    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  };
  


  // Create User Api
  export const useCreateUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const {
      mutateAsync: createUser,
      isLoading,
      isError,
      isSuccess,
      error
    } = useMutation(async(user:CreateMyUser) =>
    {
      const accessToken = await getAccessTokenSilently();
      return createUserRequest(user,accessToken);
    }); 

    

    return {
      createUser,
      isLoading,
      isError,
      isSuccess,
      error
    };
  };


type UpdateMyUser = 
{
  name:string,
  addressLine1:string,
  city:string,
  country:string
}

// Update User Function
const updateUserRequest = async(user:UpdateMyUser,accessToken:string) =>
  {
     const response = await fetch(`${API_BASE_URL}/api/v1/user/update-user`,
      {
        method:"POST",
        headers:
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body:JSON.stringify(user)
      })
      if(!response.ok)
        {
          throw new Error("Failed to create user");
        }

        return response.json();
  }


// Update User Api
export const useUpdateUser = () =>
  {

      const {getAccessTokenSilently} = useAuth0();
      const  {
                     mutateAsync : updateuser,
                      isLoading,
                      isError,
                      isSuccess,
                      error,
                      reset
              }  = useMutation(async(user:UpdateMyUser) =>
              {
                const accessToken = await getAccessTokenSilently();
                return updateUserRequest(user,accessToken)
                            })
             
                if(isSuccess)
                  {
                    toast.success("User Profile Update Successfully!");
                  }
                  if(error)
                    {
                      toast.error(error.toString());
                      reset()
                    }
    return {
      updateuser,
      isLoading,
      isError,
      isSuccess,
      error,
      reset
    }
  }



// Get User Function

const getUserRequest = async (accessToken: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/user/get-user`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  
  return response.json();
};

// Get User Api
export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchUser = async () => {
    const accessToken = await getAccessTokenSilently();
    return getUserRequest(accessToken);
  };   

  const {
    data:getuser,
     isLoading, 
     isError,
      error
     } = useQuery("fetchUser", fetchUser);
    
        if(error)
          {
            toast.error(error.toString());
          }

  return {
    getuser,
    isLoading,
    isError,
  };
};



