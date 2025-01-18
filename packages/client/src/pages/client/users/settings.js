import UserSettingsContent from "page_components/users/Settings";
import UsersProvider from "context/client/users";

const UserSettings = () => (
  <UsersProvider>
    <UserSettingsContent />
  </UsersProvider>
);

export default UserSettings;
