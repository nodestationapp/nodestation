import { Route, Routes } from "react-router-dom";

import SettingsIndex from "./pages/settings/index.js";
import SettingsSecurity from "./pages/settings/security.js";
import SettingsLayout from "./layouts/SettingsLayout/index.js";

const Settings = () => {
  return (
    <Routes>
      <Route element={<SettingsLayout />}>
        <Route index element={<SettingsIndex />} />
        <Route path="security" element={<SettingsSecurity />} />
      </Route>
    </Routes>
  );
};

export default Settings;
