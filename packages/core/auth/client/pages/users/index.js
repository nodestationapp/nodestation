import { api } from "@nstation/design-system/utils";
import TableManager from "@nstation/tables/client/components/TableManager/index.js";

const Users = () => {
  const onEntrySubmit = async (entry) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post("/admin-api/auth/user", entry);

        resolve();
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });

  return (
    <TableManager
      table="nodestation_users"
      onEntrySubmit={onEntrySubmit}
      appendColumns={[
        {
          name: "User",
          sort: "first_name",
          type: "user",
          slug: "user",
          origin: "system",
        },
      ]}
      isRowSelectable={(params) => params.row.type !== "superadmin"}
      hiddenColumns={["password", "first_name", "last_name", "photo"]}
    />
  );
};

export default Users;
