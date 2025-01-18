import "./styles.scss";
import { CommandLineIcon } from "@heroicons/react/24/outline";

const mainClass = "install-button";

const InstallButton = ({ onClick }) => {
  return (
    <button className={mainClass} onClick={onClick}>
      <CommandLineIcon />
      <span>Terminal</span>
    </button>
  );
};

export default InstallButton;
