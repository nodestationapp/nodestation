import "./styles.scss";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TreeView, { flattenTree } from "react-accessible-treeview";

import IconButton from "components/IconButton";
import LoggedUser from "components/layouts/DashboardLayout/components/Sidebar/components/LoggedUser";

import { useEditor } from "context/client/editor";
import methods_data from "libs/methods_data.json";

import {
  ClockIcon,
  CodeBracketIcon,
  FolderIcon,
  FolderOpenIcon,
  PlusIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const mainClass = "editor-layout-sidebar__menu";

function convertToJSON(data, navigate) {
  let root = {
    key: "endpoints",
    type: "folder",
    label: "Endpoints",
    root: true,
    items: [],
    extras: [
      {
        icon: <PlusIcon />,
        label: "Add endpoint",
        onClick: () => navigate("/editor/new?type=ep"),
      },
    ],
  };

  data?.forEach((item) => {
    let parts = `${item?.name}/${item?.id}`.split("/").filter((part) => part);
    let currentLevel = root;

    parts.forEach((part, index) => {
      let existingPart = currentLevel.items.find((item) => item.label === part);

      if (!existingPart) {
        const is_endpoint = index === parts.length - 1;

        existingPart = {
          type: !!is_endpoint ? "endpoint" : "folder",
          label: !!is_endpoint ? item?.options?.method?.toUpperCase() : part,
          method: item?.method,
          path: !!is_endpoint ? `/endpoints${item?.name}/${item?.id}` : null,
          items: [],
        };
        currentLevel.items.push(existingPart);
      }

      currentLevel = existingPart;
    });
  });

  return root;
}

const Menu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { editor, loading } = useEditor();

  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  const endpoints = editor?.filter((item) => item?.type === "ep");
  const crons = editor?.filter((item) => item?.type === "cron");
  const helpers = editor?.filter((item) => item?.type === "fn");
  const middlewares = editor?.filter((item) => item?.type === "mid");

  const formatted_endpoint = convertToJSON(endpoints, navigate);

  const onClickHandler = (e) => {
    if (!!e?.element?.metadata?.href) {
      navigate(e?.element?.metadata?.href);
    }
  };

  function mapEndpoints(endpoints) {
    return endpoints?.map((item) => ({
      name: item?.label,
      metadata: {
        type: "ep",
        href: !!item?.path ? `/editor${item?.path}` : null,
      },
      children: !!item?.items ? mapEndpoints(item?.items) : undefined,
    }));
  }

  const folder = {
    children: [
      {
        name: "Endpoints",
        metadata: {
          type: "ep",
          href: `/editor/endpoints`,
        },
        children: formatted_endpoint?.items?.map((item) => ({
          name: item?.label,
          children: !!item?.items ? mapEndpoints(item?.items) : undefined,
        })),
      },
      {
        name: "Crons",
        metadata: {
          type: "cron",
          href: `/editor/crons`,
        },
        children: crons?.map((item) => ({
          name: item?.name,
          metadata: {
            type: "cron",
            href: `/editor/crons/${item?.id}`,
          },
        })),
      },
      {
        name: "Helpers",
        metadata: {
          type: "fn",
          href: `/editor/helpers`,
        },
        children: helpers?.map((item) => ({
          name: item?.name,
          metadata: {
            type: "fn",
            href: `/editor/helpers/${item?.id}`,
          },
        })),
      },
      {
        name: "Middlewares",
        metadata: {
          type: "mid",
          href: `/editor/middlewares`,
        },
        children: middlewares?.map((item) => ({
          name: item?.name,
          metadata: {
            type: "mid",
            href: `/editor/middlewares/${item?.id}`,
          },
        })),
      },
    ],
  };

  const FileIcon = ({ filename, type }) => {
    switch (type) {
      case "ep":
        return (
          <span
            className={`${mainClass}--endpoint`}
            style={{
              backgroundColor: methods_data?.find(
                (item) => item?.label === filename?.toLowerCase()
              )?.color,
            }}
          />
        );
      case "cron":
        return <ClockIcon height={18} width={18} />;
      case "fn":
        return <CodeBracketIcon height={18} width={18} />;
      case "mid":
        return <ShieldCheckIcon height={18} width={18} />;
      default:
        return <FolderIcon height={18} width={18} />;
    }
  };

  const data = flattenTree(folder);

  const openAndSelectNode = (href) => {
    const targetNode = data.find((node) => node.metadata?.href === href);

    if (targetNode) {
      const parentIds = [];
      let currentNode = targetNode;
      while (currentNode.parent) {
        parentIds.unshift(currentNode.parent);
        // eslint-disable-next-line
        currentNode = data.find((node) => node.id === currentNode.parent);
      }

      setExpandedIds(parentIds);
      setSelectedIds([targetNode.id]);
    }
  };

  useEffect(() => {
    openAndSelectNode(pathname);
    // eslint-disable-next-line
  }, []);

  if (!!loading) return null;

  return (
    <div className={mainClass}>
      <div className={"directory"}>
        <TreeView
          data={data}
          aria-label="directory tree"
          selectedIds={selectedIds}
          expandedIds={expandedIds}
          onExpand={(e) => {
            onClickHandler(e);
          }}
          onNodeSelect={(e) => onClickHandler(e)}
          nodeRenderer={({
            level,
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            handleSelect,
          }) => {
            const props = getNodeProps();

            return (
              <div
                onClick={handleSelect}
                className={`${mainClass}__item`}
                {...props}
                style={{
                  paddingLeft: 10 * (level - 1),
                  paddingRight: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {isExpanded ? (
                    <FolderOpenIcon height={18} width={18} />
                  ) : isBranch || level === 1 ? (
                    <FolderIcon height={18} width={18} />
                  ) : (
                    <FileIcon
                      filename={element.name}
                      type={element?.metadata.type}
                    />
                  )}
                  {element.name}
                </div>
                {level === 1 && (
                  <IconButton
                    icon={<PlusIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/editor/new?type=${element?.metadata?.type}`);
                    }}
                  />
                )}
              </div>
            );
          }}
        />
      </div>
      <div className={`${mainClass}__bottom`}>
        <LoggedUser />
      </div>
    </div>
  );
};

export default Menu;
