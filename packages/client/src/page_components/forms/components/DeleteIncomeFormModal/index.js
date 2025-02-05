import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";
import { useForm } from "context/client/form";
import { useTableWrapper } from "context/client/table-wrapper";

const DeleteIncomeFormModal = ({ type, onClose, previewModalClose }) => {
  const { id, archived } = useForm();
  const { table } = useTableWrapper();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const itemsToDelete = table.getSelectedRowModel()?.rows;

  const onSubmit = async () => {
    setLoading(true);

    try {
      for await (const item of itemsToDelete) {
        await api.delete(`/forms/entry/${item?.original?.id}`);
      }

      queryClient.refetchQueries({
        queryKey: ["forms", id, archived],
      });

      if (type !== "list") {
        previewModalClose();
      } else {
        table.setRowSelection({});
        onClose();
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Modal
      header="Delete"
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Delete item"
    >
      <span>
        Are you sure you want to delete{" "}
        <strong>{itemsToDelete?.length} selected</strong> items?
      </span>
    </Modal>
  );
};

export default DeleteIncomeFormModal;
