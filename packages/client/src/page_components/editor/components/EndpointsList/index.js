import "./styles.scss";

import { useState } from "react";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Table from "components/Table";
import Button from "components/Button";
import IconButton from "components/IconButton";
import NoItemsFound from "components/List/components/NoItemsFound";
import LabelChanger from "components/List/components/LabelChanger";
import ArchiveEndpointModal from "./components/ArchiveEndpointModal";
import EditorContentLayout from "components/layouts/EditorContentLayout";

import { useEditor } from "context/client/editor";

import {
  LockClosedIcon,
  PlusIcon,
  ShieldCheckIcon,
  Square3Stack3DIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

const EndpointsList = () => {
  const navigate = useNavigate();
  const { editor, orderHandler } = useEditor();

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
    items: item?.items?.map((item) => ({
      onclick: () => navigate(`/editor/endpoints${item?.name}/${item?.id}`),
      disabled: item?.status === "inactive",
      actions: (
        <>
          <IconButton
            icon={<TrashIcon color="#FF3636" />}
            onClick={(e) => {
              e.stopPropagation();
              setArchiveModal(item);
            }}
          />
        </>
      ),
      data: [
        {
          key: "name",
          type: "endpoint_name",
          value: {
            name: item?.name,
            method: item?.options?.method,
            error: item?.error,
          },
        },
        {
          key: "icon",
          type: "status",
          value: item?.status,
        },
        {
          key: "icon",
          value: (
            <LockClosedIcon
              color={!!item?.options?.auth?.length ? "#fff" : "#696A73"}
            />
          ),
        },
        {
          key: "icon",
          value: (
            <ShieldCheckIcon
              color={!!item?.options?.middlewares?.length ? "#fff" : "#696A73"}
            />
          ),
        },
        {
          key: "icon",
          value: item?.options?.parser?.toUpperCase(),
        },
      ],
    })),
  }));

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      all_sections,
      result.source.index,
      result.destination.index
    );

    orderHandler(items);
  };

  return (
    <>
      <EditorContentLayout
        breadcrumps={breadcrumps}
        with_padding
        action={
          <Button href="/editor/new?type=ep" icon={<PlusIcon />}>
            Add endpoint
          </Button>
        }
      >
        {all_sections?.length === 0 ? (
          <NoItemsFound />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {all_sections?.map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={classnames(`endpoints_table_section`, {
                            [`endpoints_table_section--dragging`]:
                              !!snapshot?.isDragging,
                          })}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(provided.draggableProps.style)}
                        >
                          <div className="endpoints_table_section__header">
                            <LabelChanger
                              provided={provided}
                              snapshot={snapshot}
                              data={{
                                id: item?.group,
                                label: item?.group,
                              }}
                            />
                          </div>
                          <Table data={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
