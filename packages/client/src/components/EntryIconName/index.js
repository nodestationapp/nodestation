import "./styles.scss";

import cx from "classnames";
import { useNavigate, useLocation } from "react-router-dom";

import methods_data from "libs/methods_data.json";
import { useEditor } from "context/client/editor";

import {
  ShieldCheckIcon,
  ClockIcon,
  AtSymbolIcon,
  CodeBracketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const mainClass = "entry-icon-name";

const format_entry = (type, data) => {
  switch (type) {
    case "ep":
      return {
        label: data?.name,
        path: `/editor/endpoints${data?.name}/${data?.id}`,
        extras: {
          method: data?.options?.method,
        },
      };
    case "fn":
    case "mid":
    case "cron":
      return {
        label: data?.name,
        path: `/editor/crons/${data?.id}`,
      };
    default:
      return "";
  }
};

const icon_render = (type, extras) => {
  switch (type) {
    case "ep":
      return (
        <span
          className={`${mainClass}__icon__ep-icon`}
          style={{
            backgroundColor: methods_data?.find(
              (item) => item?.label === extras?.method
            )?.color,
          }}
        />
      );
    case "fn":
      return <CodeBracketIcon />;
    case "mid":
      return <ShieldCheckIcon />;
    case "cron":
      return <ClockIcon />;
    case "em":
      return <AtSymbolIcon />;
    default:
      return "";
  }
};

const data_parser = (type, id, entries) => {
  const data = entries?.find((item) => item?.id === id);
  const formatted_data = format_entry(type, data);

  return formatted_data;
};

const EntryIconName = ({ entry_id, text, onRemove, component }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { editor } = useEditor();

  const Component = component || !!onRemove ? "button" : "div";

  const type = entry_id?.split("_")?.[0];
  const data = data_parser(type, entry_id, editor);

  return (
    <Component
      onClick={() => navigate(data?.path)}
      type="button"
      className={cx(mainClass, {
        [`${mainClass}--active`]: pathname === data?.path,
        [`${mainClass}--static`]: !!!onRemove,
        [`${mainClass}--button`]: component === "button",
      })}
    >
      {!!!text && (
        <div className={`${mainClass}__icon`}>
          {icon_render(type, data?.extras)}
        </div>
      )}
      <span>{text || data?.label}</span>
      {!!onRemove && (
        <div className={`${mainClass}__remove`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(entry_id);
            }}
          >
            <XMarkIcon />
          </button>
        </div>
      )}
    </Component>
  );
};

export default EntryIconName;
