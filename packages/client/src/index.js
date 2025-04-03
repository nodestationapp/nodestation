import "./styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import NotifyContainer from "./components/NotifyContainer";

import AppProvider from "context/app";
import AppTheme from "./theme/AppTheme";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AppProvider>
          <AppTheme>
            <CssBaseline />
            <App />
            <NotifyContainer />
          </AppTheme>
        </AppProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
