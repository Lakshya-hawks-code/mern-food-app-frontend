import React from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children } : Props) => {
  const navigate = useNavigate();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID ;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE  
    // const navigate = useNavigate();
    console.log('VITE_AUTH0_DOMAIN:', domain);
    console.log('VITE_AUTH0_CLIENT_ID:', clientId);
    console.log('VITE_AUTH0_CALLBACK_URL:', redirectUri);

    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("Unable to initialize Auth0");
    }
    const onRedirectCallback = async(appState?:AppState) => {
      navigate(appState?.returnTo || "/auth-callback");
      };
              
    return (
        <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;
