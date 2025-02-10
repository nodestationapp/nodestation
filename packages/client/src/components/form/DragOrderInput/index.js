import "./styles.scss";

import { useRef, useState } from "react";

import Input from "../Input";
import Pill from "components/Pill";
import Dropdown from "components/Dropdown";
import KeyViewer from "components/KeyViewer";
import IconButton from "components/IconButton";
import ColorPicker from "components/ColorPicker";
import DragOrderSelectContent from "components/form/DragOrderSelect/components/DragOrderSelectContent";

import useClickOutside from "libs/helpers/useClickOutside";

import { PlusIcon } from "@heroicons/react/24/outline";

const mainClass = "dragOrderInput";

const DragOrderInput = ({ onChange, value = [], name }) => {
  const ref = useRef();

  const options = [...(value || [])];

  value = value?.map((item) => item?.value);

  const [newInputValue, setNewInputValue] = useState("");
  const [activeNewInput, setActiveNewInput] = useState(false);

  useClickOutside(ref, () => setActiveNewInput(false), activeNewInput);

  const onChangeHandler = (value) => {
    const newOrderData = value?.map((item) =>
      options?.find((element) => element?.value === item)
    );

    onChange({ target: { name, value: newOrderData } });
  };

  const LabelComponent = ({ id, label, color = "#6E5B39" }) => {
    const onColorChange = (field, newValue) => {
      const temp = [...value];

      const index = temp.findIndex((item) => item?.label === id);

      temp[index] = { ...temp[index], [field]: newValue };

      onChangeHandler(temp);
    };

    return (
      <div>
        <Dropdown
          position={["bottom", "left"]}
          button={<Pill label={label} color={color} textColor="#F0F1F3" />}
          preventChildrenClick={true}
        >
          <div>
            <ColorPicker
              value={color}
              onColorChange={(hex) => onColorChange("color", hex)}
              extraInput={
                <Input placeholder="Type color" size="small" value={label} />
              }
            />
          </div>
        </Dropdown>
      </div>
    );
  };

  const onAddHandler = (e) => {
    onChange({
      target: {
        name: "options",
        value: [
          ...options,
          {
            color: "#6E5B39",
            label: newInputValue,
            value: newInputValue,
          },
        ],
      },
    });

    setNewInputValue("");
  };

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <div className={`${mainClass}__content__header`}>
          <span>Options</span>
          {!!!activeNewInput && (
            <IconButton
              size="small"
              icon={<PlusIcon />}
              onClick={() => setActiveNewInput(true)}
            />
          )}
        </div>
        {!!activeNewInput && (
          <div ref={ref}>
            <Input
              size="small"
              autoFocus={true}
              aside={<KeyViewer data={["↵"]} variant="light" />}
              value={newInputValue}
              placeholder="New option"
              onChange={(e) => setNewInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onAddHandler(e);
                }
              }}
            />
          </div>
        )}
        <DragOrderSelectContent
          name={name}
          LabelComponent={LabelComponent}
          onChange={onChangeHandler}
          value={value}
          data={options}
        />
      </div>
    </div>
  );
};

export default DragOrderInput;
