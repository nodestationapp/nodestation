import "./styles.scss";

import cx from "classnames";

const mainClass = "pill";

const Pill = ({ label, onclick, icon, active }) => {
  return (
    <button
      onClick={onclick}
      className={cx(mainClass, {
        [`${mainClass}--active`]: !!active,
      })}
    >
      {icon}
      {label}
    </button>
  );
};

export default Pill;
