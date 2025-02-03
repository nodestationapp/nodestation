import { useState } from "react";

import Button from "components/Button";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";
import UserProfileModal from "../components/UserProfileModal";
import ArchiveUserModal from "../components/ArchiveUserModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useUsers } from "context/client/users";

import {
  PlusIcon,
  UsersIcon,
  TrashIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const table_menu = [
  {
    label: "Users",
    href: "/authentication",
  },
];

const breadcrumps = [
  {
    icon: <UsersIcon />,
    label: "Authentication",
  },
];

const UsersContent = () => {
  const { users, settings, loading, sort, setSort } = useUsers();
  const [edit_modal, setEditModal] = useState(false);
  const [archive_user_modal, setArchiveUserModal] = useState(false);

  let formatted_fields = settings?.fields?.filter(
    (item) => item?.slug !== "created_at" && item?.slug !== "id"
  );

  const new_user_schema = formatted_fields?.reduce((obj, item) => {
    obj[item.slug] = "";
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
      sort: "first_name",
      key: "first_name",
      value: "User",
      type: "user_profile",
      slug: "first_name",
    },
    ...(table_fields?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.slug === "status" ? "status" : item?.type,
      slug: item?.slug,
    })) || []),
  ];

  const toolbar = {
    menu: [
      {
        label: "Users",
        href: "/authentication",
      },
    ],
    action: [
      <IconButton
        size="small"
        icon={<Cog6ToothIcon />}
        href={`/authentication/settings`}
      />,
      <Button
        icon={<PlusIcon />}
        onClick={() => setEditModal({ row: new_user_schema })}
      >
        New
      </Button>,
    ],
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: (rows) => setArchiveUserModal(rows),
      },
    ],
  };

  return (
    <>
      <DashboardContentLayout toolbar={toolbar} breadcrumps={breadcrumps}>
        <TableStack
          data={users}
          menu={table_menu}
          sort={sort}
          setSort={setSort}
          columns={columns}
          loading={loading}
          tableId={"users"}
          rowClick={(row) => setEditModal(row)}
        />
        {!!edit_modal && (
          <UserProfileModal
            data={edit_modal?.row}
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
    </>
  );
};

export default UsersContent;
