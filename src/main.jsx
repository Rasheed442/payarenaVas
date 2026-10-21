import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { router } from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ChakraProvider } from "@chakra-ui/react";
import { CountryProvider } from "./context/CountryProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfileProvider } from "./context/ProfileProvider.jsx";
import { Toaster } from "sonner";

// Create a new QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors closeButton duration={4000} />
      <ProfileProvider>
      <CountryProvider>
        <Provider store={store}>
          <RouterProvider router={router}>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </RouterProvider>
        </Provider>
      </CountryProvider>
      </ProfileProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
