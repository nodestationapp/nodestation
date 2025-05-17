import TableManager from "@nstation/core/tables/client/components/TableManager/index.js";
import { api } from "@nstation/design-system/utils";
import { useParams } from "react-router-dom";

const TableContent = () => {
  const { id } = useParams();

  return <TableManager table={id} />;
};

export default TableContent;
