import { useState } from "react";

import MessageColumn from "../components/MessageColumn.js";
import EndpointStatus from "../components/EndpointStatus.js";
import LogDetailsModal from "../components/logDetailsModal.js";
import TableManager from "@nstation/tables/client/components/TableManager/index.js";

const columnsToShow = [
  {
    slug: "level",
    name: "Status",
    type: "select",
    renderCell: (row) => <EndpointStatus data={row} />,
    columnType: "singleSelect",
    options: [
      { value: "success", label: "Success" },
      { value: "info", label: "Info" },
      { value: "warning", label: "Warning" },
      { value: "error", label: "Error" },
    ],
  },
  {
    flex: 1,
    minWidth: 250,
    slug: "message",
    name: "Message",
    renderCell: (row) => <MessageColumn data={row?.row} />,
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
