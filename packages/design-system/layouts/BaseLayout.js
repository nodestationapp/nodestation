import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Toolbar from "@nstation/core/tables/client/components/MuiTable/components/Toolbar/index.js";

const BaseLayout = ({
  children,
  tabs,
  title,
  subtitle,
  action,
  backButtonLink,
}) => {
  return (
    <Box>
      {!!tabs && (
        <Toolbar
          noAddTab
          tabs={tabs}
          action={action}
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
      <Box>{children}</Box>
    </Box>
  );
};

export default BaseLayout;
