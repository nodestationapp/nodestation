import { useState } from "react";

import Modal from "components/Modal";

import { useUsers } from "context/client/users";
import { useTableWrapper } from "context/client/table-wrapper";

const ArchiveUserModal = ({ data, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { deleteUsers } = useUsers();
  const { table } = useTableWrapper();

  const onSubmit = async () => {
    setLoading(true);

    try {
      for await (const item of data) {
        await deleteUsers(item?.original?.id);
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
        Are you sure you want to delete <strong>{data?.length} selected</strong>{" "}
        items?
      </span>
    </Modal>
  );
};

export default ArchiveUserModal;
