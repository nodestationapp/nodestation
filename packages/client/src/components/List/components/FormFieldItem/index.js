import "./styles.scss";

import { useState } from "react";
import classnames from "classnames";

import IconButton from "components/IconButton";
import ArchiveEmailModal from "page_components/emails/components/ArchiveEmailModal";

import field_type_data from "libs/field_type_data";

import { TrashIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const mainClass = "list__form-field-item";

const getItemStyle = (draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

const FormFieldItem = ({
  name,
  status,
  slug,
  type,
  onclick,
  onRemoveClick,
  provided,
  snapshot,
  primary_key,
  origin,
}) => {
  const [archive_modal, setArchiveModal] = useState(false);

  const current_type = field_type_data?.find((item) => item?.value === type);

  return (
    <>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(provided.draggableProps.style)}
        type="button"
        onClick={onclick}
        className={classnames(mainClass, {
          [`${mainClass}--inactive`]: status === "inactive",
          [`${mainClass}--dragging`]: !!snapshot?.isDragging,
        })}
      >
        <div className={`${mainClass}__label`}>
          {current_type?.icon}
          <div className={`${mainClass}__label__text`}>
            <span>{name}</span>
            <small>{slug}</small>
          </div>
        </div>
        <div className={`${mainClass}__features`}>
          {!!primary_key && (
            <div className={`${mainClass}__features--primary-key`}>
              <span>Primary key</span>
            </div>
          )}
        </div>
        {origin === "system" && (
          <LockClosedIcon height={18} width={18} color="#647182" />
        )}
        {origin !== "system" && (
          <div className={`${mainClass}__actions`}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onRemoveClick();
              }}
              icon={<TrashIcon color="#FF3636" />}
            />
          </div>
        )}
      </div>
      {!!archive_modal && (
        <ArchiveEmailModal
          data={archive_modal}
          type="list"
          onClose={() => setArchiveModal(false)}
        />
      )}
    </>
  );
};

export default FormFieldItem;
