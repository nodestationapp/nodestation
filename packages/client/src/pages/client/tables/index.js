import TableContent from "page_components/tables/CurrentContent";
import TableProvider from "context/client/table";

const Table = ({ archived }) => (
  <TableProvider archived={archived}>
    <TableContent />
  </TableProvider>
);

export default Table;
