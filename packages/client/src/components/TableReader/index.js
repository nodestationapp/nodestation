import TableStack from "components/TableStack";

import { useTable } from "context/client/table";
import { useLocation } from "react-router-dom";

const TableReader = ({ rowClick, selectAction, newButton, meta }) => {
  const { pathname } = useLocation();
  const { data, id, loading, view, saveTableTransaction } = useTable();

  const views = data?.views;
  const entries = data?.entries || [];

  const toolbar = {
    menu:
      views?.map((item, index) => ({
        key: index,
        id: item?.id,
        label: item?.name,
        href: `${pathname}?v=${item?.id}`,
      })) || [],
    selectAction,
    customizableView: true,
    settingsButtonHandler: `${pathname}/settings`,
    newButtonHandler: newButton,
  };

  return (
    <TableStack
      tableId={id}
      view={view}
      data={entries}
      meta={meta}
      filtering={true}
      toolbar={toolbar}
      loading={loading}
      columns={data?.columns || []}
      preferences={data?.preferences}
      rowClick={({ row }) => rowClick(row)}
      saveTransaction={saveTableTransaction}
    />
  );
};

export default TableReader;
