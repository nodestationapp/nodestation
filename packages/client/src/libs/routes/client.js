import { Route } from "react-router-dom";

import AccountSettingsLayout from "components/layouts/AccountSettingsLayout";

// import Emails from "pages/client/emails";
// import EmailSettings from "pages/client/emails/settings";

// import Forms from "pages/client/forms";
// import Media from "pages/client/media";

import Table from "pages/client/tables";
import TableSettings from "pages/client/tables/settings";

import SettingsGeneral from "pages/client/settings";
import SettingsSecurity from "pages/client/settings/security";
import DashboardLayout from "layouts/DashboardLayout";
import SettingsLayout from "layouts/SettingsLayout";

// // import MediaSettings from "pages/client/media/settings";
// import Users from "pages/client/users";
// import Form from "pages/client/forms/current";
// import FormSettings from "pages/client/forms/settings";
// import UserSettings from "pages/client/users/settings";

// import Endpoints from "pages/client/endpoints";
// import MediaSettings from "pages/client/media/settings";

const clientRoutes = ({ plugins }) => {
  return (
    <Route element={<DashboardLayout />}>
      {plugins.map((plugin) => {
        return (
          <Route
            key={plugin.path}
            path={plugin.path}
            element={<plugin.component />}
          />
        );
      })}
      <Route path="/tables">
        <Route path=":id" element={<Table />} />
        <Route path=":id/settings" element={<TableSettings />} />
      </Route>
      <Route path="/settings" element={<SettingsLayout />}>
        <Route index element={<SettingsGeneral />} />
        <Route path="security" element={<SettingsSecurity />} />
      </Route>
      {/* <Route path="/emails">
        <Route index element={<Emails />} />
        <Route path="settings">
          <Route index element={<EmailSettings />} />
        </Route>
      </Route>
      <Route path="/endpoints">
        <Route index element={<Endpoints />} />
      </Route>
      <Route path="/forms">
        <Route index element={<Forms />} />
        <Route path=":id" element={<Form />} />
        <Route path=":id/archived" element={<Table archived />} />
        <Route path=":id/settings" element={<FormSettings />} />
      </Route>
      <Route path="/media">
        <Route index element={<Media />} />
        <Route path=":id" element={<MediaSettings />} />
      </Route>
      <Route path="/authentication">
        <Route index element={<Users />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>
      <Route path="/tables">
        <Route path=":id" element={<Table />} />
        <Route path=":id/settings" element={<TableSettings />} />
      </Route>
      <Route element={<AccountSettingsLayout />} path="/settings">
        <Route index element={<SettingsGeneral />} />
        <Route path="security" element={<SettingsSecurity />} />
        <Route path="notifications" element={<SettingsNotifications />} />
      </Route> */}
    </Route>
  );
};

export default clientRoutes;
