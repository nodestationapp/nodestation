import TableProvider from "context/client/table";
import TablesContent from "page_components/tables/CurrentContent";
import { useParams } from "react-router-dom";

const Tables = () => {
  const { id } = useParams();

  return (
    <TableProvider id={id}>
      <TablesContent />
    </TableProvider>
  );
};

export default Tables;
