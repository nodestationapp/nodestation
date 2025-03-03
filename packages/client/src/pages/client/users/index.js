import TableProvider from "context/client/table";
import UsersContent from "page_components/users/Content";

const Users = () => {
  return (
    <TableProvider>
      <UsersContent />
    </TableProvider>
  );
};

export default Users;
