import { Route, Routes } from "react-router-dom";

import Logger from "./pages/index.js";
import LoggerSettings from "./pages/settings.js";

const App = () => {
  return (
    <Routes>
      <Route index element={<Logger />} />
      <Route path="settings" element={<LoggerSettings />} />
    </Routes>
  );
};

export default App;
