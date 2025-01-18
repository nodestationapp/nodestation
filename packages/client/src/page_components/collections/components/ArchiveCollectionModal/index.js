import { useState } from "react";

import Modal from "components/Modal";

import { useCollection } from "context/client/collection";

const ArchiveCollectionModal = ({ data, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { deleteCollection } = useCollection();

  const onSubmit = async () => {
    setLoading(true);

    try {
      await deleteCollection();

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

export default ArchiveCollectionModal;
