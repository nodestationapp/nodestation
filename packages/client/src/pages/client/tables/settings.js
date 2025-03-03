import TableProvider from "context/client/table";
import TableSettingsContent from "page_components/tables/Settings";
import { useParams } from "react-router-dom";

const TableSettings = () => {
  const { id } = useParams();

  return (
    <TableProvider id={id}>
      <TableSettingsContent />
    </TableProvider>
  );
};

export default TableSettings;
