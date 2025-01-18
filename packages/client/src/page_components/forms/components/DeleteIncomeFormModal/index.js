import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";
import { useForm } from "context/client/form";

const DeleteIncomeFormModal = ({
  data,
  type,
  name,
  onClose,
  previewModalClose,
}) => {
  const { archived } = useForm();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/forms/entry/${data?.id}`);

      queryClient.refetchQueries({
        queryKey: ["forms", data?.form_id, archived],
      });

      if (type !== "list") {
        previewModalClose();
      } else {
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
        Are you sure you want to delete the <strong>{name}</strong> item?
      </span>
    </Modal>
  );
};

export default DeleteIncomeFormModal;
