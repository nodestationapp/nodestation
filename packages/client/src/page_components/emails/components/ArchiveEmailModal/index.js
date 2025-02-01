import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";
import api from "libs/api";

const ArchiveEmailModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      for await (const row of data) {
        await api.delete(`/emails/${row?.original?.id}`);
      }

      queryClient.refetchQueries({ queryKey: ["emails"] });

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
      submit_label="Remove item"
    >
      <span>
        Are you sure you want to delete <strong>{data?.length} selected</strong>{" "}
        items?
      </span>
    </Modal>
  );
};

export default ArchiveEmailModal;
