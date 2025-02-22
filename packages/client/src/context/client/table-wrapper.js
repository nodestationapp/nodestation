import { createContext, useContext, useMemo, useState } from "react";

const TableWrapperContext = createContext();

const TableWrapperProvider = ({ children }) => {
  const [table, setTable] = useState(null);
  const [selectedRows, setSelectedRows] = useState(null);

  const value = useMemo(() => {
    return { table, setTable, selectedRows, setSelectedRows };
    // eslint-disable-next-line
  }, [table, selectedRows]);

  return (
    <TableWrapperContext.Provider value={value}>
      {children}
    </TableWrapperContext.Provider>
  );
};

const useTableWrapper = () => useContext(TableWrapperContext);
export { TableWrapperContext, useTableWrapper };
export default TableWrapperProvider;
