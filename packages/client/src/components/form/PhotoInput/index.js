import "./styles.scss";

import classnames from "classnames";
import { useFormikContext } from "formik";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "components/IconButton";

const mainClass = "photo-input";

const generateBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PhotoInput = ({
  label,
  name,
  touched,
  error,
  value,
  uppercaseLabel = false,
  required,
  id,
  variant,
}) => {
  const is_error = touched && error !== undefined;
  const { setFieldValue } = useFormikContext();

  const onChangeHandler = async (file) => {
    try {
      const preview_image = await generateBase64(file);

      setFieldValue(name, {
        name: file?.name,
        url: preview_image,
        type: file?.type,
        file: file,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onRemoveHandler = async (e) => {
    e.preventDefault();

    try {
      setFieldValue(name, null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      id={id}
      className={classnames(mainClass, {
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--uppercase-label`]: !!uppercaseLabel,
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--empty`]: !!!value?.url,
      })}
    >
      {!!label && (
        <label>
          {label}
          {!!required && <span>*</span>}
        </label>
      )}
      <div className={`${mainClass}__content`}>
        <label
          className={`${mainClass}__content__field`}
          style={{ cursor: "pointer" }}
          htmlFor={`input-upload-${name}`}
        >
          {!!value?.url ? (
            <img src={value?.url} alt="" />
          ) : (
            <div className={`${mainClass}__content__field__placeholder`}>
              <PhotoIcon />
            </div>
          )}
          <span>{value?.name || "Empty"}</span>
          <input
            hidden
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => onChangeHandler(e.target.files?.[0])}
            id={`input-upload-${name}`}
          />
          {!!value?.url && (
            <IconButton
              onClick={onRemoveHandler}
              icon={<XMarkIcon />}
              size="small"
            />
          )}
        </label>
      </div>
      {!!is_error && <small className={`${mainClass}__error`}>{error}</small>}
    </div>
  );
};

export default PhotoInput;
