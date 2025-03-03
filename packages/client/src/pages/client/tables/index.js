import TableProvider from "context/client/table";
import TablesContent from "page_components/tables/CurrentContent";

const Tables = () => {
  return (
    <TableProvider>
      <TablesContent />
    </TableProvider>
  );
};

export default Tables;
