// import moment from "moment";

import { useState } from "react";

// import Table from "components/Table";
// import Button from "components/Button";
// import IconButton from "components/IconButton";
// import RequestsModal from "components/RequestsModal";
import TableStack from "components/TableStack";
import UserProfileModal from "../components/UserProfileModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

// import getHost from "libs/helpers/getHost";
import { useUsers } from "context/client/users";

import {
  PlusIcon,
  UsersIcon,
  // CodeBracketIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ArchiveUserModal from "../components/ArchiveUserModal";

const submenu_data = [
  {
    label: "Users",
    href: "/authentication",
  },
  {
    label: "Settings",
    href: "/authentication/settings",
  },
];

const breadcrumps = [
  {
    icon: <UsersIcon />,
    label: "Authentication",
  },
];

const UsersContent = () => {
  const { users, settings, loading } = useUsers();
  const [edit_modal, setEditModal] = useState(false);
  const [archive_user_modal, setArchiveUserModal] = useState(false);

  // const host = getHost();

  let formatted_fields = settings?.fields?.filter(
    (item) => item?.slug !== "created_at" && item?.slug !== "id"
  );

  // const requests_modal_data = [
  //   {
  //     label: "Register user",
  //     url: `${host}/api/system/auth/register`,
  //     body: formatted_fields,
  //   },
  //   {
  //     label: "Login user",
  //     url: `${host}/api/system/auth/login`,
  //     body: [
  //       {
  //         slug: "email",
  //         type: "email",
  //       },
  //       {
  //         slug: "password",
  //         type: "password",
  //       },
  //     ],
  //   },
  // ];

  const new_user_schema = formatted_fields?.reduce((obj, item) => {
    obj[item.slug] = null;
    return obj;
  }, {});

  let table_fields = settings?.fields?.filter(
    (item) =>
      item?.slug !== "id" &&
      item?.slug !== "first_name" &&
      item?.slug !== "last_name" &&
      item?.slug !== "photo" &&
      item?.slug !== "password"
  );

  const columns = [
    {
      key: "user_profile",
      value: "User",
      type: "user_profile",
      slug: "user_profile",
    },
    ...(table_fields?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || []),
  ];

  const selectAction = [
    {
      icon: <TrashIcon color="#FF3636" />,
      onClick: (rows, clearSelection) =>
        setArchiveUserModal({ rows, clearSelection }),
    },
  ];

  if (!!loading) return;

  return (
    <>
      <DashboardContentLayout
        noContentPadding
        breadcrumps={breadcrumps}
        submenu={submenu_data}
      >
        <TableStack
          data={users}
          columns={columns}
          onSearch={() => {}}
          tableName={"nodestation_users"}
          selectAction={selectAction}
          rowClick={(row) => setEditModal(row)}
          // asideMenu={asideMenu}
          addRowButton={{
            label: "New",
            icon: <PlusIcon />,
            onClick: () => setEditModal(new_user_schema),
          }}
        />
        {!!edit_modal && (
          <UserProfileModal
            data={edit_modal}
            onClose={() => setEditModal(false)}
          />
        )}
      </DashboardContentLayout>
      {!!archive_user_modal && (
        <ArchiveUserModal
          data={archive_user_modal}
          onClose={() => setArchiveUserModal(false)}
        />
      )}
      {/* {request_modal && (
        <RequestsModal
          data={requests_modal_data}
          onClose={() => setRequestModal(null)}
        />
      )} */}
    </>
  );
};

export default UsersContent;
