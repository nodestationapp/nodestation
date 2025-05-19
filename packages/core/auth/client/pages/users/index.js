import TableManager from "@nstation/tables/client/components/TableManager/index.js";
import { api } from "@nstation/design-system/utils";

const Users = () => {
  const onEntrySubmit = async (entry) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post("/p/auth/user", entry);

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
          type: "user_profile",
          slug: "user",
          origin: "system",
        },
      ]}
      hiddenColumns={["password", "first_name", "last_name", "photo"]}
    />
  );
};

export default Users;
