import UsersContent from "page_components/users/Content";
import UsersProvider from "context/client/users";

const Users = () => (
  <UsersProvider>
    <UsersContent />
  </UsersProvider>
);

export default Users;
