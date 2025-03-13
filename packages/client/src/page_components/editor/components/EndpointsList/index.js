import "./styles.scss";

import { useState } from "react";

import Button from "components/Button";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";
import ContentEditorModal from "../ContentEditorModal";
import NoItemsFound from "components/List/components/NoItemsFound";
import ArchiveEndpointModal from "./components/ArchiveEndpointModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useEditor } from "context/client/editor";

import {
  PlusIcon,
  TrashIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

const EndpointsList = () => {
  const { editor, setEditorModal, editor_modal } = useEditor();

  const [archive_modal, setArchiveModal] = useState(false);

  let groups = [];
  editor?.forEach((item) => {
    let group_name = item?.path?.split("/")?.[1];

    const index = groups?.findIndex((item) => item?.group === group_name);

    if (group_name === item?.name) return;

    if (index === -1) {
      groups?.push({
        group: group_name,
        items: [item],
      });
    } else {
      groups[index] = {
        ...groups[index],
        items: [...groups[index]?.items, item],
      };
    }
  });

  const breadcrumps = [
    {
      label: "Endpoints",
      icon: <Square3Stack3DIcon />,
    },
  ];

  const columns = [
    {
      key: "name",
      value: "Name",
      slug: "endpoint_name",
      type: "endpoint_name",
    },
    // {
    //   key: "status",
    //   value: "Status",
    //   slug: "status",
    //   type: "status",
    // },
    {
      key: "authentication",
      type: "icon",
      slug: "authentication",
      value: "Authentication",
    },
    {
      key: "middlewares",
      type: "icon",
      slug: "middlewares",
      value: "Middlewares",
    },
  ];

  return (
    <>
      <DashboardContentLayout
        breadcrumps={breadcrumps}
        with_padding
        action={
          <Button href="/editor/new?type=ep" icon={<PlusIcon />}>
            New
          </Button>
        }
      >
        {groups?.length === 0 ? (
          <NoItemsFound />
        ) : (
          <>
            {groups?.map((item, index) => {
              const toolbar = {
                menu: [
                  {
                    label:
                      item?.group.charAt(0).toUpperCase() +
                      item?.group.slice(1),
                    variant: "label",
                  },
                ],
                hideColumnOrder: true,
              };
              return (
                <div key={index} className={`endpoints_table_section`}>
                  <TableStack
                    fullWidth
                    hideHeader
                    toolbar={toolbar}
                    disabledSelect={true}
                    data={item?.items}
                    columns={columns}
                    rowAction={({ row }) => (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setArchiveModal(row);
                        }}
                        icon={<TrashIcon color="#FF3636" />}
                      />
                    )}
                    rowClick={({ row }) => setEditorModal(row)}
                  />
                </div>
              );
            })}
          </>
        )}
      </DashboardContentLayout>
      {!!archive_modal && (
        <ArchiveEndpointModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
      {!!editor_modal && (
        <ContentEditorModal
          data={editor_modal}
          onClose={() => setEditorModal(false)}
        />
      )}
    </>
  );
};

export default EndpointsList;
