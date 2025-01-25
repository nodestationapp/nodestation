import { useState } from "react";

import Modal from "components/Modal";

import { useTable } from "context/client/table";

const ArchiveTableEntryModal = ({ data, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { deleteTableEntries } = useTable();

  const onSubmit = async () => {
    setLoading(true);

    const items = data?.rows?.map((item) => item?.original?.id);

    try {
      await deleteTableEntries(items);
      data?.clearSelection();

      onClose();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Modal
      header="Delete table entries"
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Delete"
    >
      <span>
        Are you sure you want to delete{" "}
        <strong>{data?.rows?.length} selected</strong> items?
      </span>
    </Modal>
  );
};

export default ArchiveTableEntryModal;
