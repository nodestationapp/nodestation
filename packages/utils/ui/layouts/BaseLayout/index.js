import { Box, Divider, Stack, Typography } from "@mui/material";
import Toolbar from "components/MuiTable/components/Toolbar";

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
          tabs={tabs}
          noAddTab
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
