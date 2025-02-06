import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";
import NoItemsFound from "components/List/components/NoItemsFound";
import ArchiveEndpointModal from "./components/ArchiveEndpointModal";
import EditorContentLayout from "components/layouts/EditorContentLayout";

import { useEditor } from "context/client/editor";

import {
  PlusIcon,
  Square3Stack3DIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const EndpointsList = () => {
  const navigate = useNavigate();
  const { editor } = useEditor();

  const [archive_modal, setArchiveModal] = useState(false);

  const endpoints = editor?.filter((item) => item?.type === "ep");

  let groups = [];
  endpoints?.forEach((item) => {
    let group_name = item?.name?.split("/")?.[1];

    const index = groups?.findIndex((item) => item?.group === group_name);

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
      icon: <Square3Stack3DIcon />,
      label: "Endpoints",
    },
  ];

  const fields = [
    {
      sort_key: "path",
      key: "name",
      value: "Name",
    },
    {
      key: "icon",
      sort_key: "status",
      value: "Status",
    },
    {
      key: "icon",
      sort_key: "auth",
      value: "Authentication",
    },
    {
      key: "icon",
      sort_key: "middlewares",
      value: "Middlewares",
    },
    {
      key: "icon",
      sort_key: "parser",
      value: "Parser",
    },
  ];

  const all_sections = groups?.map((item) => ({
    keys: [...fields],
    group: item?.group,
    items: item?.items,
  }));

  const columns = [
    {
      key: "name",
      value: "Name",
      slug: "endpoint_name",
      type: "endpoint_name",
    },
    {
      key: "status",
      value: "Status",
      slug: "status",
      type: "status",
    },
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
      <EditorContentLayout
        breadcrumps={breadcrumps}
        with_padding
        action={
          <Button href="/editor/new?type=ep" icon={<PlusIcon />}>
            New
          </Button>
        }
      >
        {all_sections?.length === 0 ? (
          <NoItemsFound />
        ) : (
          <>
            {all_sections?.map((item, index) => {
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
                  {/* <div className="endpoints_table_section__header">
                  <LabelChanger
                    data={{
                      id: item?.group,
                      label: item?.group,
                    }}
                  />
                </div> */}
                  <TableStack
                    fullWidth
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
                    rowClick={({ row }) =>
                      navigate(`/editor/endpoints${row?.name}/${row?.id}`)
                    }
                  />
                </div>
              );
            })}
          </>
        )}
      </EditorContentLayout>
      {!!archive_modal && (
        <ArchiveEndpointModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </>
  );
};

export default EndpointsList;
