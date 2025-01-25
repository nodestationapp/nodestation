import { useState } from "react";

import Modal from "components/Modal";

import { useTable } from "context/client/table";
import { useOrganization } from "context/organization";
import { useNavigate } from "react-router-dom";

const ArchiveTableModal = ({ data, onClose }) => {
  const navigate = useNavigate();
  const { deleteTable } = useTable();
  const { tables = [], refetchTables } = useOrganization();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    const next = tables?.filter((item) => item?.id !== data?.id)?.[0];

    const redirect = !!next ? `/tables/${next?.id}` : "/";

    try {
      await deleteTable();
      refetchTables();

      onClose();
      navigate(redirect);
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
