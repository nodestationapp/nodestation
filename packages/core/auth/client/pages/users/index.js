import TableManager from "@nstation/core/tables/client/components/TableManager/index.js";

const Users = () => (
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

export default Users;
