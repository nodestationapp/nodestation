import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Modal from "components/Modal";
import api from "libs/api";

const ArchiveFormModal = ({ data, type, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await api.delete(`/forms/${data?.id}`);

      if (type === "list") {
        queryClient.refetchQueries({ queryKey: ["forms"] });

        onClose();
      } else {
        navigate("/forms");
      }
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
      header="Delete form"
      onClose={onClose}
      onSubmit={onSubmit}
      loading={loading}
      variant="error"
      submit_label="Delete"
      submit_keys={["↵"]}
    >
      <span>
        Are you sure you want to delete the{" "}
        <strong>{data?.label || data?.name}</strong> form?
      </span>
    </Modal>
  );
};

export default ArchiveFormModal;
