import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";
import { useOrganization } from "context/organization";

const ArchiveHelperModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();
  const { removeMinimizeHandler } = useOrganization();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/editor/${data?.id}`);
      queryClient.refetchQueries({ queryKey: ["editor"] });

      removeMinimizeHandler(data?.id);

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
      submit_label="Remove"
    >
      <span>
        Are you sure you want to delete <strong>selected</strong> item?
      </span>
    </Modal>
  );
};

export default ArchiveHelperModal;
