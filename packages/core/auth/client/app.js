import { Route, Routes } from "react-router-dom";

import Users from "./pages/users/index.js";
import UsersSettings from "./pages/users/settings.js";

const Auth = () => {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="settings" element={<UsersSettings />} />
    </Routes>
  );
};

export default Auth;
