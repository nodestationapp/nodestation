import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { AppTheme } from "@nstation/design-system/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import AppProvider from "contexts/app";
import { SlotProvider } from "contexts/slots";

import createApp from "utils/createApp";
import pluginsLoader from "utils/pluginsLoader";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

const app = createApp();
pluginsLoader(app);

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AppTheme>
          <CssBaseline />
          <SlotProvider>
            <AppProvider app={app}>
              <App />
            </AppProvider>
          </SlotProvider>
        </AppTheme>
      </CookiesProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
