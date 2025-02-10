import { useState } from "react";

import TableStack from "components/TableStack";
import UserProfileModal from "../components/UserProfileModal";
import ArchiveUserModal from "../components/ArchiveUserModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useUsers } from "context/client/users";

import { TrashIcon, UsersIcon } from "@heroicons/react/24/outline";

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
  const { users, settings, loading, sort, setSort, filters, setFilters } =
    useUsers();

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
      // item?.slug !== "id" &&
      item?.slug !== "first_name" &&
      item?.slug !== "last_name" &&
      item?.slug !== "photo" &&
      item?.slug !== "password"
  );

  const columns = !!table_fields
    ? [
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
          type: item?.type,
          slug: item?.slug,
        })) || []),
      ]
    : [];

  const toolbar = {
    menu: [
      {
        label: "Entries",
        href: `/authentication`,
      },
    ],
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: () => setArchiveUserModal(true),
      },
    ],
    settingsButtonHandler: `/authentication/settings`,
    newButtonHandler: () => setEditModal({ row: new_user_schema }),
  };

  return (
    <>
      <DashboardContentLayout breadcrumps={breadcrumps}>
        <TableStack
          data={users}
          menu={table_menu}
          sort={sort}
          filters={filters}
          setFilters={setFilters}
          toolbar={toolbar}
          setSort={setSort}
          columns={columns}
          loading={loading}
          tableId="users"
          tableSchema={settings?.fields}
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
        <ArchiveUserModal onClose={() => setArchiveUserModal(false)} />
      )}
    </>
  );
};

export default UsersContent;
