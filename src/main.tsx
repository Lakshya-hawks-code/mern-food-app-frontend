import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router} from "react-router-dom";
import AppRoutes from './AppRoutes';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNaviagte';
import "./global.css";
import { QueryClient, QueryClientProvider} from 'react-query';
import { Toaster } from "@/components/ui/sonner"
const queryClient = new QueryClient
({
  defaultOptions:
  {
    queries:
    {
      refetchOnWindowFocus:false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
         <AppRoutes/> 
         <Toaster style={{marginTop:"35px"}} visibleToasts={1} position='top-right' richColors/>
      </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
)