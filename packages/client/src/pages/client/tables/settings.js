import TableProvider from "context/client/table";
import TableSettingsContent from "page_components/tables/Settings";

const TableSettings = () => {
  return (
    <TableProvider>
      <TableSettingsContent />
    </TableProvider>
  );
};

export default TableSettings;
