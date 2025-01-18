import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";
import { useOrganization } from "context/organization";

const ArchiveEndpointModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();
  const { removeMinimizeHandler } = useOrganization();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/editor/${data?.id}`);
      queryClient.refetchQueries({ queryKey: ["editor"] });

      removeMinimizeHandler(data?.id);

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
      header="Remove endpoint"
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Remove item"
      submit_keys={["↵"]}
    >
      <span>
        Are you sure you want to move the{" "}
        <strong>
          {data?.options?.method?.toUpperCase()} {`${data?.name}`}
        </strong>{" "}
        endpoint to the archive? The Endpoint will become inactive and will no
        longer be available!
      </span>
    </Modal>
  );
};

export default ArchiveEndpointModal;
