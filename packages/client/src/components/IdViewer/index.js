import "./styles.scss";

import { useState } from "react";
import Tooltip from "components/Tooltip";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const mainClass = "id-viewer";

const IdViewer = ({ id }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={mainClass}>
      <Tooltip text={!!copied ? "Copied" : "Copy ID"}>
        <button type="button" onClick={onCopy}>
          <span>{id}</span>
          <ClipboardDocumentListIcon />
        </button>
      </Tooltip>
    </div>
  );
};

export default IdViewer;
