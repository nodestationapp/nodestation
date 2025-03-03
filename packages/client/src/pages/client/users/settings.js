import UserSettingsContent from "page_components/users/Settings";
import TableProvider from "context/client/table";

const UserSettings = () => (
  <TableProvider>
    <UserSettingsContent />
  </TableProvider>
);

export default UserSettings;
