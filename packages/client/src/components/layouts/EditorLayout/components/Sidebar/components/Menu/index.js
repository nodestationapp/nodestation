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

const Menu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { editor, loading } = useEditor();

  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  const onClickHandler = (e) => {
    if (!!e?.element?.metadata?.href) {
      navigate(e?.element?.metadata?.href);
    }
  };

  const FileIcon = ({ filename, type }) => {
    switch (type) {
      case "endpoints":
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
      case "crons":
        return <ClockIcon height={18} width={18} />;
      case "helpers":
        return <CodeBracketIcon height={18} width={18} />;
      case "middlewares":
        return <ShieldCheckIcon height={18} width={18} />;
      default:
        return <FolderIcon height={18} width={18} />;
    }
  };

  const data = flattenTree({
    children: editor,
  });

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
                      type={element?.metadata?.type}
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
