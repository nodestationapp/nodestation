import TableContent from "page_components/tables/CurrentContent";
import TableProvider from "context/client/table";

const Table = ({ type, archived }) => (
  <TableProvider type={type} archived={archived}>
    <TableContent />
  </TableProvider>
);

export default Table;
