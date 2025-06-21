import { useState } from "react";

import LogDetailsModal from "../components/logDetailsModal.js";
import TableManager from "@nstation/tables/client/components/TableManager/index.js";
import moment from "moment";

const columnsToShow = [
  {
    slug: "status",
    name: "Status",
    type: "logger:endpoint-status",
    columnType: "number",
  },
  {
    slug: "method",
    name: "Method",
    type: "logger:endpoint-method",
    columnType: "singleSelect",
    valueOptions: ["GET", "POST", "PUT", "DELETE"],
  },
  {
    flex: 1,
    minWidth: 250,
    slug: "url",
    name: "Source",
    type: "endpoint",
  },
  {
    width: 240,
    slug: "user",
    name: "User",
    type: "user",
  },
  {
    width: 200,
    name: "Date",
    type: "date",
    slug: "created_at",
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
