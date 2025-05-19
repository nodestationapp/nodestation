import TableManager from "@nstation/tables/client/components/TableManager/index.js";
import { useParams } from "react-router-dom";

const TableContent = () => {
  const { id } = useParams();

  return <TableManager table={id} />;
};

export default TableContent;
