import "./styles.scss";

import { useState } from "react";
import classnames from "classnames";

import Tooltip from "components/Tooltip";
import IconButton from "components/IconButton";
import MethodSelect from "components/MethodSelect";
import ArchiveEndpointModal from "page_components/editor/components/EndpointsList/components/ArchiveEndpointModal";

import {
  TrashIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const mainClass = "list__endpoint-item";

const EndpointItem = ({
  id,
  method,
  path,
  status,
  auth,
  middlewares,
  parser,
  onclick,
}) => {
  const [archive_modal, setArchiveModal] = useState(false);

  return (
    <>
      <div
        onClick={onclick}
        className={classnames(mainClass, {
          [`${mainClass}--inactive`]: status === "inactive",
        })}
      >
        <div className={`${mainClass}__label`}>
          <MethodSelect method={method} read_only />
          <span>/{path}</span>
        </div>
        <div className={`${mainClass}__features`}>
          <Tooltip text="Authentication">
            <LockClosedIcon color={!!auth ? "#fff" : "#696A73"} />
          </Tooltip>
          <Tooltip text="Middleware">
            <ShieldCheckIcon
              color={!!middlewares?.length > 0 ? "#fff" : "#696A73"}
            />
          </Tooltip>
          <Tooltip text="Parser">
            <span>{parser}</span>
          </Tooltip>
          {/* <MethodSelect method={method} read_only />
          <span>/{path}</span> */}
        </div>
        <div className={`${mainClass}__actions`}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setArchiveModal({ id, method, path });
            }}
            icon={<TrashIcon color="#FF3636" />}
          />
        </div>
      </div>
      {!!archive_modal && (
        <ArchiveEndpointModal
          data={archive_modal}
          type="list"
          onClose={() => setArchiveModal(false)}
        />
      )}
    </>
  );
};

export default EndpointItem;
