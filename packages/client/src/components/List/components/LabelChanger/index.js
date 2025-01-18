import "./styles.scss";
import { useState } from "react";
import classnames from "classnames";

import api from "libs/api";

const mainClass = "label-changer";

const LabelChanger = ({ data, provided }) => {
  const [current_label, setCurrentLabel] = useState(data?.label);
  const [input_active, setInputActive] = useState(false);

  const onSubmit = async () => {
    try {
      await api.put(`/editor/group/${data?.id}`, { label: current_label });
      setInputActive(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--active`]: !!input_active,
      })}
    >
      <span
        onFocus={() => setInputActive(true)}
        onBlur={onSubmit}
        spellCheck={false}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e?.target?.blur();
          }
        }}
        onInput={(e) => setCurrentLabel(e.currentTarget.textContent)}
      >
        {data?.label}
      </span>
    </div>
  );
};

export default LabelChanger;
