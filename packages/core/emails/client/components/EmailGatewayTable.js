import { useState } from "react";

import Stack from "@mui/material/Stack";
import { Box, Button } from "@mui/material";

import ProviderSettingsModal from "./ProviderSettingsModal.js";

import TableManager from "@nstation/tables/client/components/TableManager/index.js";
import { Add } from "@mui/icons-material";

import StarIcon from "@mui/icons-material/Star";

const EmailGatewayTable = () => {
  const [provider_settings_modal, setProviderSettingsModal] = useState(false);

  const columnsToShow = [
    {
      flex: 1,
      minWidth: 230,
      slug: "email",
      name: "Email",
      type: "text",
      renderCell: (row) => row?.row?.content?.email,
    },
    {
      width: 120,
      name: "Provider",
      type: "text",
      slug: "provider",
    },
    {
      width: 120,
      name: "Default",
      type: "boolean",
      slug: "is_default",
      renderCell: (row) =>
        !!row?.row?.is_default ? (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <StarIcon sx={{ color: "primary.light" }} />
          </Box>
        ) : null,
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
          table="nodestation_email_providers"
          appendColumns={columnsToShow}
          onRowClick={(row) => setProviderSettingsModal(row)}
          action={() => (
            <>
              <Button
                startIcon={<Add />}
                onClick={() => setProviderSettingsModal(true)}
                variant="outlined"
                size="small"
              >
                Add provider
              </Button>
            </>
          )}
        />
      </Box>
      {!!provider_settings_modal && (
        <ProviderSettingsModal
          open={provider_settings_modal}
          onClose={() => setProviderSettingsModal(false)}
        />
      )}
    </Stack>
  );
};

export default EmailGatewayTable;
