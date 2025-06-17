import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import { api } from "@nstation/design-system/utils";
import MuiTable from "@nstation/tables/client/components/MuiTable/index.js";
import tableColumnsRender from "@nstation/tables/client/utils/tableColumnsRender.js";

const columnsToShow = [
  {
    slug: "status",
    name: "Status",
    type: "endpoint_status",
  },
  {
    slug: "method",
    name: "Method",
    type: "endpoint_method",
  },
  {
    width: 200,
    type: "date",
    slug: "created_at",
    name: "Date",
  },
  {
    flex: 1,
    slug: "url",
    name: "Source",
    type: "endpoint",
  },

  {
    flex: 1,
    slug: "message",
    name: "Message",
  },
];

const LoggerIndex = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["logger"],
    queryFn: () => api.get(`/admin-api/logger`),
  });

  const columns = tableColumnsRender({
    columns: columnsToShow,
  });

  return (
    <Box>
      <MuiTable
        // page={1}
        hideToolbar
        // action={action}
        loading={isLoading}
        noAddTab
        columns={columns}
        rows={data?.items?.items}
        // selectActions={selectActions}
        // pagination={{
        //   count: 1,
        //   pageSize: 10,
        // }}
        // onRowClick={({ row }) => setEmailEditorModal(row)}
      />
    </Box>
  );
};

export default LoggerIndex;
