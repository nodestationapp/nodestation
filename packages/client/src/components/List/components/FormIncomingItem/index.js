import "./styles.scss";

import moment from "moment";
import classnames from "classnames";

import Tooltip from "components/Tooltip";
import IconButton from "components/IconButton";

import { useApp } from "context/app";
import { useForm } from "context/client/form";

import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  EnvelopeOpenIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const mainClass = "list__form-incoming-item";

const FormIncomingItem = ({
  id,
  created_at,
  is_read,
  onclick,
  parsed_fields,
}) => {
  const { setFormsCount } = useApp();

  const { archived, updateIncomeForm } = useForm();

  const moveToArchiveHandler = async (id) => {
    try {
      await updateIncomeForm(id, { archived: !!archived ? false : true });
    } catch (err) {
      console.error(err);
    }
  };

  const isReadHandler = async (id) => {
    try {
      const next_state = !is_read;

      await updateIncomeForm(id, { is_read: next_state });
      setFormsCount((prev) =>
        next_state ? parseInt(prev) - 1 : parseInt(prev) + 1
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        type="button"
        onClick={onclick}
        className={classnames(mainClass, {
          [`${mainClass}--inactive`]: !!is_read,
        })}
      >
        <div className={`${mainClass}__label`}>
          <span>{parsed_fields?.[0]}</span>
        </div>
        <div className={`${mainClass}__features`}>
          <div className={`${mainClass}__features__item`}>
            <p>{parsed_fields?.[1]}</p>
          </div>
        </div>
        <div className={`${mainClass}__actions`}>
          <div className={`${mainClass}__actions__extras`}>
            <span>{moment?.unix(created_at)?.format("DD MMM")}</span>
          </div>
          <Tooltip text={!!is_read ? "Mark as unread" : "Mark as read"}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                isReadHandler(id);
              }}
              icon={
                !!is_read ? (
                  <EnvelopeIcon color="#F0F1F3" />
                ) : (
                  <EnvelopeOpenIcon color="#F0F1F3" />
                )
              }
            />
          </Tooltip>
          <Tooltip text={!!archived ? "Move to incoming" : "Move to archive"}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                moveToArchiveHandler(id);
              }}
              icon={
                !!archived ? (
                  <ArchiveBoxIcon color="#F0F1F3" />
                ) : (
                  <ArchiveBoxArrowDownIcon color="#F0F1F3" />
                )
              }
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default FormIncomingItem;
