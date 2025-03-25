import TableProvider from "context/client/table";
import UsersContent from "page_components/users/Content";

const Users = () => {
  return (
    <TableProvider id="nodestation_users">
      <UsersContent />
    </TableProvider>
  );
};

export default Users;
