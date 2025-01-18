import "./styles.scss";

import { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Tooltip from "components/Tooltip";
import IconButton from "components/IconButton";
import ArchiveFormModal from "page_components/forms/components/ArchiveFormModal";

import { TrashIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const mainClass = "list__form-item";

const FormItem = ({ name, id, status, unread_count, total_count }) => {
  const [archive_modal, setArchiveModal] = useState(false);

  let formatted_unread_count = parseInt(unread_count);

  return (
    <>
      <Link
        to={`/forms/${id}`}
        className={classnames(mainClass, {
          [`${mainClass}--inactive`]: status === "inactive",
        })}
      >
        <div className={`${mainClass}__label`}>
          {!!formatted_unread_count && (
            <Tooltip text="Unread messages">
              <span className={`${mainClass}__features__item__unread`}>
                {formatted_unread_count}
              </span>
            </Tooltip>
          )}
          <span>{name}</span>
        </div>
        <div className={`${mainClass}__features`}>
          <div className={`${mainClass}__features__item`}>
            <Tooltip text="All messages">
              <PaperAirplaneIcon color="#fff" />
              <span>{total_count}</span>
            </Tooltip>
          </div>
        </div>
        <div className={`${mainClass}__actions`}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setArchiveModal({ id, name });
            }}
            icon={<TrashIcon color="#FF3636" />}
          />
        </div>
      </Link>
      {!!archive_modal && (
        <ArchiveFormModal
          data={archive_modal}
          type="list"
          onClose={() => setArchiveModal(false)}
        />
      )}
    </>
  );
};

export default FormItem;
