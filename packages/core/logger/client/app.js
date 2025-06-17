import { Route, Routes } from "react-router-dom";

import Logger from "./pages/index.js";

const App = () => {
  return (
    <Routes>
      <Route index element={<Logger />} />
    </Routes>
  );
};

export default App;
