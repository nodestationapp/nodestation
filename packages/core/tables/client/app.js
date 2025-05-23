import { Route, Routes } from "react-router-dom";

import TableContent from "./pages/index.js";
import TableSettings from "./pages/settings.js";

const Table = () => {
  return (
    <Routes>
      <Route path=":id" element={<TableContent />} />
      <Route path=":id/settings" element={<TableSettings />} />
    </Routes>
  );
};

export default Table;
