import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";

import api from "libs/api";

const ArchiveEndpointModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete("/editor", {
        data: {
          path: `/endpoints${data?.path}/${data?.name}`,
        },
      });
      queryClient.refetchQueries({ queryKey: ["editor"] });
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
