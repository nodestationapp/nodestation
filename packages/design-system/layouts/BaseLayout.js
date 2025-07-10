import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Toolbar from "@nstation/tables/client/components/MuiTable/components/Toolbar/index.js";
import PageLoader from "../components/PageLoader/index.js";

const BaseLayout = ({
  tabs,
  title,
  action,
  loading,
  subtitle,
  children,
  selectedRows,
  selectActions,
  backButtonLink,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      {!!tabs && (
        <Toolbar
          noAddTab
          tabs={tabs}
          action={action}
          selectedRows={selectedRows}
          selectActions={selectActions}
          backButtonLink={backButtonLink}
        />
      )}
      <Divider sx={{ mb: 2 }} />
      {!!title && (
        <>
          <Stack direction="column" sx={{ mb: 2 }}>
            <Typography component="h2" variant="h6">
              {title}
            </Typography>
            <Typography>{subtitle}</Typography>
          </Stack>
          <Divider sx={{ mb: 3 }} />
        </>
      )}
      {!!loading ? <PageLoader fullContainer /> : <Box>{children}</Box>}
    </Box>
  );
};

export default BaseLayout;
