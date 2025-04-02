import { Route, Routes } from "react-router-dom";

import DashboardIndex from "./dashboard.js";

const Dashboard = () => {
  return (
    <Routes>
      <Route index element={<DashboardIndex />} />
    </Routes>
  );
};

export default Dashboard;
