import { useParams } from "react-router-dom";
import TableManager from "#client/components/TableManager/index.js";

const TableContent = () => {
  const { id } = useParams();

  return <TableManager key={id} table={id} />;
};

export default TableContent;
