import { useState } from "react";

import Modal from "components/Modal";

import { useTable } from "context/client/table";
import { useTableWrapper } from "context/client/table-wrapper";

const ArchiveTableEntryModal = ({ onClose }) => {
  const { table } = useTableWrapper();
  const { deleteTableEntries } = useTable();
  const [loading, setLoading] = useState(false);

  const itemsToDelete = table.getSelectedRowModel()?.rows;

  const onSubmit = async () => {
    setLoading(true);

    try {
      for await (const item of itemsToDelete) {
        await deleteTableEntries(item?.original?.id);
      }

      table.setRowSelection({});

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
        <strong>{itemsToDelete?.length} selected</strong> items?
      </span>
    </Modal>
  );
};

export default ArchiveTableEntryModal;
