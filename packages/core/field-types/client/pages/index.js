import { useParams } from "react-router-dom";

import TableManager from "@nstation/tables/client/components/TableManager/index.js";

const TableContent = () => {
  const { id } = useParams();

  return <TableManager key={id} table={id} />;
};

export default TableContent;
