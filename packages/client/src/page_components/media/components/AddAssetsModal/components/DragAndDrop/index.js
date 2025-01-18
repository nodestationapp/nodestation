import "./styles.scss";

import { FileUploader } from "react-drag-drop-files";
import Button from "components/Button";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const mainClass = "add-media__drag-and-drop";

const DragAndDrop = ({ onChange }) => {
  return (
    <div className={mainClass}>
      <FileUploader
        classes={`${mainClass}__content`}
        multiple={true}
        handleChange={onChange}
        name="file"
        hoverTitle=" "
      >
        <div className={`${mainClass}__info`}>
          <ArrowUpTrayIcon />
          <span>Drag and drop files to upload</span>
        </div>
        <Button variant="border-transparent">Choose files</Button>
      </FileUploader>
    </div>
  );
};

export default DragAndDrop;
