import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";
import { useOrganization } from "context/organization";
import { useTableWrapper } from "context/client/table-wrapper";

const ArchiveEndpointModal = ({ data, onClose }) => {
  const { table } = useTableWrapper();
  const queryClient = useQueryClient();
  const { removeMinimizeHandler } = useOrganization();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/editor/${data?.id}`);
      queryClient.refetchQueries({ queryKey: ["editor"] });

      removeMinimizeHandler(data?.id);
      table.setRowSelection({});

      onClose();
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
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Remove"
      submit_keys={["↵"]}
    >
      <span>
        Are you sure you want to delete <strong>{data?.length} selected</strong>{" "}
        item?
      </span>
    </Modal>
  );
};

export default ArchiveEndpointModal;
