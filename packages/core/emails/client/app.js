import { Route, Routes } from "react-router-dom";

import Emails from "./pages/emails/index.js";
import EmailsProvider from "./contexts/emails.js";

const App = () => {
  return (
    <EmailsProvider>
      <Routes>
        <Route index element={<Emails />} />
      </Routes>
    </EmailsProvider>
  );
};

export default App;
