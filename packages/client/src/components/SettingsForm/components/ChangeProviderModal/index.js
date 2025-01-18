import { useState } from "react";

import Modal from "components/Modal";

import { useMedia } from "context/client/media";

const ChangeProviderModal = ({ data, onClose }) => {
  const { updateMediaSettings } = useMedia();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      updateMediaSettings({ type: "active", active: data?.value });
      onClose();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Change anyway"
    >
      <span>
        Are you sure you want to change the media provider to{" "}
        <strong>{data?.label}</strong>?<br />
        All current media files will be permanently deleted and cannot be
        recovered!
      </span>
    </Modal>
  );
};

export default ChangeProviderModal;
