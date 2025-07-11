import { useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";

import MessageColumn from "../components/MessageColumn.js";
import EndpointStatus from "../components/EndpointStatus.js";
import LogDetailsModal from "../components/logDetailsModal.js";
import TableManager from "@nstation/tables/client/components/TableManager/index.js";

const columnsToShow = [
  {
    slug: "level",
    name: "Status",
    renderCell: (row) => <EndpointStatus data={row} />,
  },
  {
    flex: 1,
    minWidth: 340,
    slug: "message",
    name: "Message",
    renderCell: (row) => <MessageColumn data={row?.row} />,
  },
  {
    width: 200,
    slug: "source",
    name: "Source",
    type: "select",
    options: [],
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
  const navigate = useNavigate();
  const [logDetailsModal, setLogDetailsModal] = useState(null);

  return (
    <>
      <TableManager
        hideActions
        table="nodestation_logger"
        appendColumns={columnsToShow}
        onRowClick={(row) => setLogDetailsModal(row)}
        action={() => (
          <>
            <IconButton size="micro" onClick={() => navigate(`/logs/settings`)}>
              <Settings />
            </IconButton>
          </>
        )}
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
