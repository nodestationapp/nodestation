import "./styles.scss";

import classnames from "classnames";

import Loader from "components/Loader";
import IconButton from "components/IconButton";

import formatBytes from "libs/helpers/formatBytes";
import mime_types from "libs/mime_types.json";

import {
  LinkIcon,
  TrashIcon,
  CheckCircleIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

const mainClass = "media-item";

const MediaItem = ({
  id,
  name,
  size,
  url,
  is_uploading_progress,
  variant,
  type,
  onRemove,
}) => {
  const placeholder_render = (type) => {
    switch (type) {
      case "image":
        return <img src={url} alt="" />;
      default:
        return (
          <div className={`${mainClass}__image__file`}>
            <DocumentIcon />
          </div>
        );
    }
  };

  const onRemoveHandler = () => {
    onRemove({ id, name });
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error(err);
    }
  };

  const mime_type = mime_types?.find((item) => item?.value === type);

  const placeholder = placeholder_render(mime_type?.type);

  return (
    <button
      className={classnames(mainClass, {
        [`${mainClass}--${variant}`]: !!variant,
      })}
    >
      <div className={`${mainClass}__image`}>
        {placeholder}
        <div className={`${mainClass}__image__buttons`}>
          <IconButton onClick={onCopy} variant="filled" icon={<LinkIcon />} />
          <IconButton
            onClick={onRemoveHandler}
            variant="filled"
            icon={<TrashIcon color="#FF3636" />}
          />
        </div>
      </div>
      <div className={`${mainClass}__info`}>
        <div className={`${mainClass}__info__label`}>
          <span>{name}</span>
          <small>{formatBytes(size)}</small>
        </div>
        <div className={`${mainClass}__info__progress`}>
          {!!is_uploading_progress ? (
            is_uploading_progress !== 100 ? (
              <Loader />
            ) : (
              <CheckCircleIcon />
            )
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default MediaItem;
