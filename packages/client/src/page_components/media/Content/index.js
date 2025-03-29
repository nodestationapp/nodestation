import "./styles.scss";

import { useState } from "react";

import Button from "components/Button";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";
import AddAssetsModal from "../components/AddAssetsModal";
import RemoveMediaModal from "../components/RemoveMediaModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useMedia } from "context/client/media";

import {
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  PhotoIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <PhotoIcon />,
    label: "Media",
  },
];

const submenu_data = [
  {
    label: "My uploads",
    href: "/media",
  },
  {
    label: "Settings",
    href: "/media/settings",
  },
];

const MediaContent = () => {
  const { media, loading, saveTableTransaction } = useMedia();

  const [add_media_modal, setAddMediaModal] = useState(false);
  const [remove_media_modal, setRemoveMediaModal] = useState(false);

  const toolbar = {
    menu: [
      {
        label: "Uploads",
        href: `/media`,
      },
    ],
    action: [
      <IconButton
        size="small"
        icon={<Cog6ToothIcon />}
        href={`/media/settings`}
      />,
      <Button icon={<PlusIcon />} onClick={() => setAddMediaModal(true)}>
        New
      </Button>,
    ],
  };

  const columns = [
    {
      key: "media_name",
      name: "Name",
      slug: "media_name",
      type: "media_name",
    },
    {
      key: "type",
      name: "Type",
      slug: "type",
      type: "mime_type",
      width: 120,
    },
    {
      key: "size",
      name: "Size",
      slug: "size",
      type: "media_size",
      width: 100,
    },
    {
      key: "created_at",
      name: "Created at",
      slug: "created_at",
      type: "date",
      width: 260,
    },
  ];

  return (
    <>
      <DashboardContentLayout
        toolbar={toolbar}
        loading={loading}
        breadcrumps={breadcrumps}
        action={
          <Button onClick={() => setAddMediaModal(true)} icon={<PlusIcon />}>
            Add media
          </Button>
        }
        submenu={submenu_data}
      >
        <TableStack
          fullWidth
          data={media}
          tableId="nodestation_media"
          columns={columns}
          loading={loading}
          rowSize="large"
          saveTransaction={saveTableTransaction}
          rowAction={({ row }) => (
            <>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(row?.url, "_blank");
                }}
                icon={<ArrowTopRightOnSquareIcon />}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setRemoveMediaModal({ id: row?.id, name: row?.name });
                }}
                icon={<TrashIcon color="#FF3636" />}
              />
            </>
          )}
        />
      </DashboardContentLayout>
      {!!add_media_modal && (
        <AddAssetsModal onClose={() => setAddMediaModal(false)} />
      )}
      {!!remove_media_modal && (
        <RemoveMediaModal
          data={remove_media_modal}
          onClose={() => setRemoveMediaModal(false)}
        />
      )}
    </>
  );
};

export default MediaContent;
