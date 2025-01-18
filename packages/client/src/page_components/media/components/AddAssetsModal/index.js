import "./styles.scss";

import { useState } from "react";

import Modal from "components/Modal";
import DragAndDrop from "./components/DragAndDrop";
import UploadedAssets from "./components/UploadedAssets";
import { useMedia } from "context/client/media";

const generateBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddAssetsModal = ({ onClose }) => {
  const { uploading_files, setUploadingFiles } = useMedia();
  const [nextStep, setNextStep] = useState(false);

  const handleChange = async (files) => {
    let formatted_files = [];

    for await (const file of files) {
      const base64 = await generateBase64(file);

      formatted_files.push({
        name: file?.name,
        size: file?.size,
        type: file?.type,
        url: base64,
        raw: file,
      });
    }

    setUploadingFiles(formatted_files);
    setNextStep(true);
  };

  return (
    <Modal header="Add media" size="wide" onClose={onClose} hide_submit={true}>
      {nextStep ? (
        <UploadedAssets files={uploading_files} />
      ) : (
        <DragAndDrop onChange={handleChange} />
      )}
    </Modal>
  );
};

export default AddAssetsModal;
