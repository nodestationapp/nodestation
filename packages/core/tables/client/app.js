import { Route, Routes } from "react-router-dom";

import TableContent from "./pages/index.js";
import TableSettings from "./pages/settings.js";

const Table = () => {
  return (
    <Routes>
      <Route index element={<TableContent />} />
      <Route path="settings" element={<TableSettings />} />
    </Routes>
  );
};

export default Table;
