import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "contexts/app.js";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import { AppTheme } from "@nstation/design-system/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AppTheme>
          <CssBaseline />
          <AppProvider>
            <App />
          </AppProvider>
        </AppTheme>
      </CookiesProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
