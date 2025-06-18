import { useState } from "react";

import LogDetailsModal from "../components/logDetailsModal.js";
import TableManager from "@nstation/tables/client/components/TableManager/index.js";

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
    flex: 1,
    slug: "url",
    name: "Source",
    type: "endpoint",
  },
  {
    width: 200,
    type: "date",
    slug: "created_at",
    name: "Date",
  },
];

const LoggerIndex = () => {
  const [logDetailsModal, setLogDetailsModal] = useState(null);

  return (
    <>
      <TableManager
        hideActions
        table="nodestation_logger"
        appendColumns={columnsToShow}
        onRowClick={(row) => setLogDetailsModal(row)}
      />
      {!!logDetailsModal && (
        <LogDetailsModal
          data={logDetailsModal}
          onClose={() => setLogDetailsModal(null)}
        />
      )}
    </>
  );
};

export default LoggerIndex;
