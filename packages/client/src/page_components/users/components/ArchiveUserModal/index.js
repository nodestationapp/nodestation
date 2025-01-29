import { useState } from "react";

import Modal from "components/Modal";

import { useUsers } from "context/client/users";

const ArchiveUserModal = ({ data, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { deleteUsers } = useUsers();

  const onSubmit = async () => {
    setLoading(true);

    const items = data?.rows?.map((item) => item?.original?.id);

    try {
      await deleteUsers(items);
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

export default ArchiveUserModal;
