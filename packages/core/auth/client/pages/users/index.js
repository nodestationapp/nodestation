import TableManager from "components/TableManager";
import useSetBreadcrumbs from "@nstation/utils/ui/hooks/useSetBreadcrumbs.js";

import { People } from "@mui/icons-material";

const Users = () => {
  useSetBreadcrumbs([
    {
      icon: People,
      label: "Authentication",
    },
  ]);

  return (
    <TableManager
      table="nodestation_users"
      appendColumns={[
        {
          name: "User",
          sort: "first_name",
          type: "user_profile",
          slug: "user",
          origin: "system",
        },
      ]}
      hiddenColumns={["first_name", "last_name", "photo", "password"]}
    />
  );
};

export default Users;
