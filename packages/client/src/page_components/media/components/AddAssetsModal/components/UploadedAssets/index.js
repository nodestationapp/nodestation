import "./styles.scss";

import { useEffect } from "react";

import MediaItem from "components/MediaItem";
import { useMedia } from "context/client/media";

const mainClass = "add-assets__uploaded-assets";

const UploadedAssets = ({ files }) => {
  const { uploadFiles, percent } = useMedia();

  useEffect(() => {
    let formatted_files = files?.map((item) => item?.raw);

    (async function () {
      await uploadFiles(formatted_files);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={mainClass}>
      {files?.map((item, index) => (
        <MediaItem
          key={index}
          {...item}
          variant="dark"
          is_uploading_progress={percent?.[index]}
        />
      ))}
    </div>
  );
};

export default UploadedAssets;
