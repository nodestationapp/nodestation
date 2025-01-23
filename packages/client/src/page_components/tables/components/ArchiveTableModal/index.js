import { useState } from "react";

import Modal from "components/Modal";

import { useTable } from "context/client/table";

const ArchiveTableModal = ({ data, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { deleteTable } = useTable();

  const onSubmit = async () => {
    setLoading(true);

    try {
      await deleteTable();

      onClose();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Modal
      header="Delete table"
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Delete"
    >
      <span>
        Are you sure you want to delete{" "}
        <strong>{data?.label || data?.name}</strong> table?
      </span>
    </Modal>
  );
};

export default ArchiveTableModal;
