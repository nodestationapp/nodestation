import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";
import { useForm } from "context/client/form";
import { useTableWrapper } from "context/client/table-wrapper";

const DeleteIncomeFormModal = ({ data, type, onClose, previewModalClose }) => {
  const { id, archived } = useForm();
  const { table } = useTableWrapper();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      const entry_ids = data?.map((item) => item?.original?.id);
      await api.delete(`/forms/entries`, {
        data: {
          entry_ids,
        },
      });

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
        Are you sure you want to delete <strong>{data?.length} selected</strong>{" "}
        items?
      </span>
    </Modal>
  );
};

export default DeleteIncomeFormModal;
