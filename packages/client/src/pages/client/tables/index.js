import { useParams } from "react-router-dom";

import TablesContent from "page_components/tables/CurrentContent";
import TableProvider from "context/client/table";

const Tables = () => {
  const { id } = useParams();

  return (
    <TableProvider id={id}>
      <TablesContent />
    </TableProvider>
  );
};

export default Tables;
