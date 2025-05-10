import { Route, Routes } from "react-router-dom";

import Users from "./pages/users/index.js";
import UsersSettings from "./pages/users/settings/index.js";
import UsersTemplates from "./pages/users/settings/templates.js";

const Auth = () => {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="settings">
        <Route index element={<UsersSettings />} />
        <Route path="templates" element={<UsersTemplates />} />
      </Route>
    </Routes>
  );
};

export default Auth;
