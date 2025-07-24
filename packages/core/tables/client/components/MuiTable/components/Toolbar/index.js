import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ToolbarTabs from "./Tabs.js";
import { Box } from "@mui/material";

const Toolbar = ({
  tabs,
  action,
  loading,
  selectActions,
  selectedRows,
  noAddTab,
  backButtonLink,
  hidden,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      {!!selectedRows?.length ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body" color="text.secondary">
            Actions:
          </Typography>
          {selectActions(selectedRows)}
        </Stack>
      ) : !hidden ? (
        <ToolbarTabs
          tabs={tabs}
          loading={loading}
          noAddTab={noAddTab}
          backButtonLink={backButtonLink}
        />
      ) : (
        <Box></Box>
      )}

      <Stack direction="row" gap={1} alignItems="center">
        {action?.()}
      </Stack>
    </Stack>
  );
};

export default Toolbar;
