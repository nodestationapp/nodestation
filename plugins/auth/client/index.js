import { Route, Routes } from "react-router-dom";

import Users from "./users.js";
import UsersSettings from "./settings.js";

const Dashboard = () => {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="settings" element={<UsersSettings />} />
    </Routes>
  );
};

export default Dashboard;
