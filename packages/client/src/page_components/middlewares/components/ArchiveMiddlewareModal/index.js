import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";

const ArchiveMiddlewareModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/middlewares/${data?.id}`);
      queryClient.refetchQueries({ queryKey: ["client_middlewares"] });

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
        <strong>{data?.label || data?.name}</strong> middleware to the archive?
        The middleware will no longer be available!
      </span>
    </Modal>
  );
};

export default ArchiveMiddlewareModal;
