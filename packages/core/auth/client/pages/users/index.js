import TableManager from "@nstation/core/tables/client/components/TableManager/index.js";
import api from "../../../../../client/src/utils/api.js";

const Users = () => {
  const onEntrySubmit = async (entry) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post("/p/auth/user", entry);

        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });

  return (
    <TableManager
      table="nodestation_users"
      onEntrySubmit={onEntrySubmit}
      // appendColumns={[
      //   {
      //     name: "User",
      //     sort: "first_name",
      //     type: "user_profile",
      //     slug: "user",
      //     origin: "system",
      //   },
      // ]}
      hiddenColumns={["password"]}
    />
  );
};

export default Users;
