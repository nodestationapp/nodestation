import { useState } from "react";

import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";

import ApiTokenModal from "./ApiTokenModal.js";
import TableManager from "@nstation/tables/client/components/TableManager/index.js";

import { Add } from "@mui/icons-material";

const ApiTokensTable = () => {
  const [api_modal, setApiModal] = useState(false);

  const columnsToShow = [
    {
      flex: 1,
      minWidth: 230,
      slug: "name",
      name: "Name",
      type: "text",
    },
    {
      width: 200,
      type: "date",
      name: "Expires at",
      slug: "expires_at",
    },
    {
      width: 200,
      name: "Created at",
      type: "date",
      slug: "created_at",
    },
  ];

  return (
    <Stack direction="column" alignItems="flex-end" gap={1.5} flexWrap="wrap">
      <Box sx={{ width: "100%" }}>
        <TableManager
          hideActions
          hideToolbar
          rowHeight={60}
          table="nodestation_users_api_tokens"
          appendColumns={columnsToShow}
          onRowClick={() => {}}
          action={() => (
            <>
              <Button
                startIcon={<Add />}
                onClick={() => setApiModal(true)}
                variant="outlined"
                size="small"
              >
                Add API token
              </Button>
            </>
          )}
        />
      </Box>
      {!!api_modal && (
        <ApiTokenModal open={api_modal} onClose={() => setApiModal(false)} />
      )}
    </Stack>
  );
};

export default ApiTokensTable;
