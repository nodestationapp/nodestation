import { Route, Routes } from "react-router-dom";

import Emails from "./pages/emails/index.js";
import EmailsSettings from "./pages/emails/settings.js";

import EmailsProvider from "./contexts/emails.js";
const App = () => {
  return (
    <EmailsProvider>
      <Routes>
        <Route index element={<Emails />} />
        <Route path="settings" element={<EmailsSettings />} />
      </Routes>
    </EmailsProvider>
  );
};

export default App;
