import { Route, Routes } from "react-router-dom";

import SettingsIndex from "./pages/settings/index.js";
import SettingsSecurity from "./pages/settings/security.js";
import SettingsLayout from "./layouts/SettingsLayout/index.js";
import ApiTokensSettings from "./pages/settings/api_tokens.js";
const Settings = () => {
  return (
    <Routes>
      <Route element={<SettingsLayout />}>
        <Route index element={<SettingsIndex />} />
        <Route path="security" element={<SettingsSecurity />} />
        <Route path="api-tokens" element={<ApiTokensSettings />} />
      </Route>
    </Routes>
  );
};

export default Settings;
