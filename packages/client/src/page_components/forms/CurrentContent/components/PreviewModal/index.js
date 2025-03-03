import "./styles.scss";

import moment from "moment";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Tooltip from "components/Tooltip";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import AsideModal from "components/AsideModal";

import DeleteIncomeFormModal from "page_components/forms/components/DeleteIncomeFormModal";

import api from "libs/api";
import formatBytes from "libs/helpers/formatBytes";

// import { useForm } from "context/client/form";

import {
  PaperClipIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";

const mainClass = "preview-modal";

const value_render = (type, value) => {
  switch (type) {
    case "text":
    case "select":
    case "email":
      return <span>{value?.toString()}</span>;
    case "media":
      return (
        <a
          href={value?.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${mainClass}__item__media__item`}
        >
          <div className={`${mainClass}__item__media__item__icon`}>
            <PaperClipIcon />
          </div>
          <div className={`${mainClass}__item__media__item__info`}>
            <span>{value?.name}</span>
            <small>
              <ArrowDownTrayIcon />
              {formatBytes(value?.size)}
            </small>
          </div>
        </a>
      );
    default:
      return "";
  }
};

const PreviewModal = ({
  data,
  type,
  fields,
  displayName,
  onClose,
  updateTableEntry,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [delete_modal, setDeleteModal] = useState(false);

  useEffect(() => {
    (async function () {
      if (!!data?.meta?.disabled) return;
      updateTableEntry(data?.id, { is_read: 1 });
      // readHandler(data?.meta?.id, 0);
    })();
    // eslint-disable-next-line
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/forms/${data?.meta?.id}`);
      if (type === "list") {
        queryClient.refetchQueries({ queryKey: ["client_forms"] });

        onClose();
      } else {
        navigate("/forms");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const moveToArchiveHandler = async () => {
    try {
      // await updateIncomeForm(data?.meta?.id, {
      //   archived: !!data?.meta?.disabled ? false : true,
      // });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AsideModal
        header={data?.[displayName]}
        onSubmit={onSubmit}
        reject_label="Close"
        loading={loading}
        submit_label={
          <>
            Save
            <KeyViewer data={["⌘", "S"]} />
          </>
        }
        custom_actions={
          <>
            <Tooltip text="Move to archive">
              <IconButton
                onClick={moveToArchiveHandler}
                icon={<ArchiveBoxArrowDownIcon />}
              />
            </Tooltip>
            <Tooltip text="Delete">
              <IconButton
                onClick={() => setDeleteModal(true)}
                icon={<TrashIcon color="#FF3636" />}
              />
            </Tooltip>
          </>
        }
        onClose={onClose}
      >
        <div className={mainClass}>
          {fields?.map((item, index) => {
            if (item?.type === "id") return;

            return (
              <div
                key={index}
                className={classnames(`${mainClass}__item`, {
                  [`${mainClass}__item--vertical`]:
                    item?.type === "media" || item?.variant === "long",
                })}
              >
                <span>{item?.name}:</span>
                {value_render(item?.type, data?.[item?.slug])}
              </div>
            );
          })}
          <div className={`${mainClass}__item`}>
            <span>Created at:</span>
            <span>{moment.unix(data?.created_at)?.format("lll")}</span>
          </div>
        </div>
      </AsideModal>
      {!!delete_modal && (
        <DeleteIncomeFormModal
          data={data}
          onClose={() => setDeleteModal(false)}
          previewModalClose={onClose}
        />
      )}
    </>
  );
};

export default PreviewModal;
