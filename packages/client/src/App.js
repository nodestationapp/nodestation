import { Routes, Route } from "react-router-dom";

import DashboardLayout from "layouts/DashboardLayout";
import { useApp } from "@nstation/utils/ui/contexts/app.js";

const App = () => {
  const { menuLinks } = useApp();

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {menuLinks.map((link) => (
          <Route
            key={link.to}
            path={`${link.to}/*`}
            element={<link.Component />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
