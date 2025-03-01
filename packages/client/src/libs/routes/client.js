import { Route } from "react-router-dom";

import DashboardLayout from "components/layouts/DashboardLayout";
import AccountSettingsLayout from "components/layouts/AccountSettingsLayout";

import Dashboard from "pages/client";

import Editor from "pages/client/editor";
import EditorCurrent from "pages/client/editor/current";

import Emails from "pages/client/emails";
import EmailSettings from "pages/client/emails/settings";

import Forms from "pages/client/forms";
import Form from "pages/client/forms/current";
import FormSettings from "pages/client/forms/settings";

import Media from "pages/client/media";

import UsersSettings from "pages/client/users/settings";

import Table from "pages/client/tables";
import TableSettings from "pages/client/tables/settings";

import SettingsGeneral from "pages/client/settings";
import SettingsSecurity from "pages/client/settings/security";

import EditorLayout from "components/layouts/EditorLayout";
import MediaSettings from "pages/client/media/settings";

const clientRoutes = () => {
  return (
    <>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/emails">
          <Route index element={<Emails />} />
          <Route path="settings">
            <Route index element={<EmailSettings />} />
          </Route>
        </Route>
        <Route path="/forms">
          <Route index element={<Forms />} />
          <Route path=":id" element={<Table type="forms" />} />
          <Route path=":id/archived" element={<Form archived />} />
          <Route path=":id/settings" element={<FormSettings />} />
        </Route>
        <Route path="/media">
          <Route index element={<Media />} />
          <Route path=":id" element={<MediaSettings />} />
        </Route>
        <Route path="/authentication">
          <Route index element={<Table />} />
          <Route path="settings" element={<UsersSettings />} />
        </Route>
        <Route path="/tables">
          <Route path=":id" element={<Table />} />
          <Route path=":id/settings" element={<TableSettings />} />
        </Route>
        <Route element={<AccountSettingsLayout />} path="/settings">
          <Route index element={<SettingsGeneral />} />
          <Route path="security" element={<SettingsSecurity />} />
          {/* <Route path="notifications" element={<SettingsNotifications />} /> */}
        </Route>
      </Route>
      <Route element={<EditorLayout />}>
        <Route path="/editor">
          <Route index element={<Editor />} />
          <Route path="*" element={<EditorCurrent />} />
        </Route>
      </Route>
    </>
  );
};

export default clientRoutes;
