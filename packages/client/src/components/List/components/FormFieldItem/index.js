import "./styles.scss";

import { useState } from "react";
import classnames from "classnames";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import IconButton from "components/IconButton";
import ArchiveEmailModal from "page_components/emails/components/ArchiveEmailModal";

import field_type_data from "libs/field_type_data";

import {
  TrashIcon,
  LockClosedIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

const mainClass = "list__form-field-item";

const FormFieldItem = ({
  name,
  status,
  slug,
  type,
  onclick,
  onRemoveClick,
  primary_key,
  origin,
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slug });
  const [archive_modal, setArchiveModal] = useState(false);
  const [is_grabbing, setIsGrabbing] = useState(false);

  const style = {
    opacity: isDragging && !!slug ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const current_type = field_type_data?.find((item) => item?.value === type);

  return (
    <>
      <div
        key={slug}
        ref={setNodeRef}
        style={style}
        className={classnames(mainClass, {
          [`${mainClass}--inactive`]: status === "inactive",
          [`${mainClass}--is-grabbing`]: !!is_grabbing,
        })}
        type="button"
        onClick={onclick}
      >
        <div className={`${mainClass}__handle`}>
          <IconButton
            {...attributes}
            {...listeners}
            onMouseDown={() => setIsGrabbing(true)}
            onMouseLeave={() => setIsGrabbing(false)}
            size="small"
            variant="light"
            icon={<EllipsisVerticalIcon />}
          />
        </div>
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
