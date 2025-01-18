import "./styles.scss";

import cx from "classnames";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import IconButton from "components/IconButton";
import methods_data from "libs/methods_data.json";

import { FolderIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const mainClass = "editor-layout-sidebar__menu-folder";

const icon_render = (data) => {
  switch (data?.type) {
    case "folder":
      return <FolderIcon />;
    case "endpoint":
      return (
        <span
          className={`${mainClass}--endpoint`}
          style={{
            backgroundColor: methods_data?.find(
              (item) => item?.label === data?.method
            )?.color,
          }}
        />
      );
    default:
      return <DocumentTextIcon />;
  }
};

const FolderComponent = ({ data }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let pathname_array = pathname?.split("/");
    pathname_array?.splice(0, 2);

    if (!!data?.root) {
      if (pathname_array?.[0] === data?.key) {
        setOpen(true);
      }
    } else {
      pathname_array = `/${pathname_array?.join("/")}`;
      if (pathname_array === data?.path) {
        setOpen(true);
      }
    }
    // eslint-disable-next-line
  }, [pathname]);

  const onClickHandler = () => {
    if (!!data?.root) {
      navigate(`/editor/${data?.key}`);
    }

    if (data?.type === "file" || data?.type === "endpoint") {
      navigate(`/editor${data?.path}`);
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <button
        onClick={onClickHandler}
        className={cx(`${mainClass}__item`, {
          [`${mainClass}__item--active`]:
            (data?.type === "file" || data?.type === "endpoint") &&
            pathname === `/editor${data?.path}`,
        })}
      >
        <span>
          {icon_render(data)}
          {data?.label}
        </span>
        <div className={`${mainClass}__item__extras`}>
          {data?.extras?.map((item, index) => (
            <IconButton
              key={index}
              icon={item?.icon}
              onClick={(e) => {
                e.stopPropagation();
                item?.onClick();
              }}
            />
          ))}
        </div>
      </button>
      {!!open && (
        <div className={`${mainClass}__item__content`}>
          {data?.items?.map((item, index) => (
            <FolderComponent key={index} data={item} />
          ))}
        </div>
      )}
    </>
  );
};

const MenuFolder = ({ data }) => {
  return (
    <div className={mainClass}>
      <FolderComponent data={data} />
    </div>
  );
};

export default MenuFolder;
