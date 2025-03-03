import TableStack from "components/TableStack";

import { useTable } from "context/client/table";
import { useLocation } from "react-router-dom";

const TableReader = ({ rowClick, selectAction, newButton }) => {
  const { pathname } = useLocation();
  const { data, id, loading, saveTableTransaction } = useTable();

  const table = data?.table;
  const entries = data?.entries || [];

  const toolbar = {
    menu: [
      {
        label: "Entries",
        href: pathname,
      },
    ],
    selectAction,
    settingsButtonHandler: `${pathname}/settings`,
    newButtonHandler: newButton,
  };

  return (
    <TableStack
      tableId={id}
      data={entries}
      filtering={true}
      toolbar={toolbar}
      loading={loading}
      tableSchema={table?.fields}
      columns={data?.columns || []}
      preferences={data?.preferences}
      rowClick={({ row }) => rowClick(row)}
      saveTransaction={saveTableTransaction}
    />
  );
};

export default TableReader;
