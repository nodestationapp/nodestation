import moment from "moment";

import { useState } from "react";

import Table from "components/Table";
import Button from "components/Button";
import IconButton from "components/IconButton";
import RequestsModal from "components/RequestsModal";
import UserProfileModal from "../components/UserProfileModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import getHost from "libs/helpers/getHost";
import { useUsers } from "context/client/users";

import {
  PlusIcon,
  UsersIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

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
  const [request_modal, setRequestModal] = useState(false);

  const host = getHost();

  let formatted_fields = settings?.fields?.filter(
    (item) => item?.slug !== "created_at" && item?.slug !== "id"
  );

  const requests_modal_data = [
    {
      label: "Register user",
      url: `${host}/api/system/auth/register`,
      body: formatted_fields,
    },
    {
      label: "Login user",
      url: `${host}/api/system/auth/login`,
      body: [
        {
          slug: "email",
          type: "email",
        },
        {
          slug: "password",
          type: "password",
        },
      ],
    },
  ];

  const new_user_schema = formatted_fields?.reduce((obj, item) => {
    obj[item.slug] = null;
    return obj;
  }, {});

  const table_data = {
    keys: [
      {
        key: "user_profile",
        value: "User",
      },
      {
        key: "status",
        value: "Status",
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "type",
        value: "Type",
      },
      {
        key: "created_at",
        value: "Created at",
      },
    ],
    items: users?.map((item) => ({
      onclick: () => setEditModal(item),
      data: [
        {
          key: "user_profile",
          type: "user_profile",
          value: {
            name: `${item?.first_name} ${item?.last_name}`,
            photo: item?.photo,
          },
        },
        {
          key: "status",
          type: "status",
          value: item?.status,
        },
        {
          key: "email",
          value: item?.email,
        },
        {
          key: "type",
          value: item?.type,
        },
        {
          key: "created_at",
          value: !!item?.created_at
            ? moment(item?.created_at).format("lll")
            : "-",
        },
      ],
    })),
  };

  return (
    <>
      <DashboardContentLayout
        breadcrumps={breadcrumps}
        submenu={submenu_data}
        action={
          <>
            <IconButton
              onClick={() => setRequestModal(true)}
              icon={<CodeBracketIcon color="#F0F1F3" />}
            />
            <Button
              onClick={() => setEditModal(new_user_schema)}
              icon={<PlusIcon />}
            >
              Add User
            </Button>
          </>
        }
      >
        <Table data={table_data} loading={loading} setSort={() => {}} />
        {!!edit_modal && (
          <UserProfileModal
            data={edit_modal}
            onClose={() => setEditModal(false)}
          />
        )}
      </DashboardContentLayout>
      {request_modal && (
        <RequestsModal
          data={requests_modal_data}
          onClose={() => setRequestModal(null)}
        />
      )}
    </>
  );
};

export default UsersContent;
