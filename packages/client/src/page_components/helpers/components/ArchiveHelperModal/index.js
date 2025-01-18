import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";

const ArchiveHelperModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/helpers/${data?.id}`);
      queryClient.refetchQueries({ queryKey: ["client_helpers"] });

      onClose();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Modal
      header="Move to archive"
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Remove item"
    >
      <span>
        Are you sure you want to move the{" "}
        <strong>{data?.label || data?.name}</strong> function to the archive?
      </span>
    </Modal>
  );
};

export default ArchiveHelperModal;
