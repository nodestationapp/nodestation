import "./styles.scss";
import { useState } from "react";

import Loader from "components/Loader";
import { ReactComponent as ProfilePlaceholder } from "assets/icons/profile-placeholder.svg";

const mainClass = "photo-form";

const PhotoForm = ({ photo, onChange }) => {
  const [loading, setLoading] = useState(false);

  const onChangeHandler = async (file) => {
    try {
      setLoading(true);
      await onChange(file);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <div className={`${mainClass}__image`}>
          {!!photo ? <img src={photo?.url} alt="" /> : <ProfilePlaceholder />}
          {!!loading && (
            <div className={`${mainClass}__image__loader`}>
              <Loader />
            </div>
          )}
        </div>
        <label
          className="button"
          style={{ cursor: "pointer" }}
          htmlFor="account-settings-upload-image"
        >
          Change
          <input
            hidden
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => onChangeHandler(e.target.files?.[0])}
            id="account-settings-upload-image"
          />
        </label>
      </div>
    </div>
  );
};

export default PhotoForm;
