import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";
import api from "libs/api";

import { useTableWrapper } from "context/client/table-wrapper";

const ArchiveEmailModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();
  const { table } = useTableWrapper();

  const [loading, setLoading] = useState(false);

  const itemsToDelete = table.getSelectedRowModel()?.rows;

  const onSubmit = async () => {
    setLoading(true);

    try {
      for await (const row of itemsToDelete) {
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
        Are you sure you want to delete{" "}
        <strong>{itemsToDelete?.length} selected</strong> items?
      </span>
    </Modal>
  );
};

export default ArchiveEmailModal;
