import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";
import { useTableWrapper } from "context/client/table-wrapper";

const ArchiveFormModal = ({ data, type, onClose }) => {
  const navigate = useNavigate();
  const { table } = useTableWrapper();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const itemsToDelete = !!data?.id ? [data] : table.getSelectedRowModel()?.rows;

  const onSubmit = async () => {
    setLoading(true);

    try {
      const entry_ids = !!data?.id
        ? [data?.id]
        : itemsToDelete?.map((item) => item?.original?.id);

      for await (const item of entry_ids) {
        await api.delete(`/tables/${item}?type=forms`);
      }

      if (type === "list") {
        table.setRowSelection({});
        queryClient.refetchQueries({ queryKey: ["forms"] });

        onClose();
      } else {
        navigate("/forms");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const enterSubmitHandler = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", enterSubmitHandler);

    return () => {
      document.removeEventListener("keydown", enterSubmitHandler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Modal
      header="Delete form"
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Delete"
      submit_keys={["↵"]}
    >
      <span>
        Are you sure you want to delete{" "}
        <strong>{itemsToDelete?.length} selected</strong> items?
      </span>
    </Modal>
  );
};

export default ArchiveFormModal;
