import "./styles.scss";

import classnames from "classnames";
import { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Select from "../Select";
import IconButton from "components/IconButton";
import TransparentButton from "components/TransparentButton";

import useOnScreen from "libs/helpers/useOnScreen";
import useClickOutside from "libs/helpers/useClickOutside";

import {
  EllipsisVerticalIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const mainClass = "drag-order-select";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (draggableStyle) => ({
  userSelect: "none",
  ...draggableStyle,
});

const DragOrderSelect = ({
  label,
  options = [],
  placeholder,
  required,
  selected,
  onChange,
  disabled,
  value = [],
  touched,
  error,
  hideError,
  id,
  variant,
}) => {
  const is_error = !!!hideError && touched && !!error;

  const [select_open, setSelectOpen] = useState(false);

  const ref = useRef();
  const button_ref = useRef();

  useClickOutside(ref, () => {
    setSelectOpen(false);
  });

  const can_bottom = useOnScreen(button_ref);

  const appendMiddleware = (item) => {
    let temp = [...value];

    temp.push(item);
    onChange({ target: { value: temp } });
  };

  const removeMiddleware = (item) => {
    let temp = [...value];

    const index = temp?.findIndex((element) => element === item);

    temp.splice(index, 1);

    onChange({ target: { value: temp } });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(value, result.source.index, result.destination.index);

    onChange({ target: { value: items } });
  };

  const formatted_value = value?.map((item) => ({
    label: options?.find((element) => element?.value === item)?.label,
    value: item,
  }));

  const formatted_options = options?.filter(
    (item) => !value?.includes(item?.value)
  );

  return (
    <div
      ref={ref}
      id={id}
      className={classnames(mainClass, {
        [`${mainClass}--active`]: !!select_open,
        [`${mainClass}--selected`]: !!selected,
        [`${mainClass}--top`]: !!!can_bottom,
        [`${mainClass}--disabled`]: !!disabled,
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--empty`]: !!!value,
        [`${mainClass}--filled`]: !!value,
        [`${mainClass}--${variant}`]: !!variant,
      })}
    >
      {!!label && (
        <label>
          {label}
          {!!required && <span>*</span>}
        </label>
      )}
      <button
        ref={button_ref}
        type="button"
        onClick={() => setSelectOpen((prev) => !prev)}
      >
        <span>
          {value
            ?.map(
              (item) =>
                options?.find((element) => element?.value === item)?.label
            )
            ?.join(", ") || placeholder}
        </span>
      </button>
      {select_open && (
        <div
          className={classnames(`${mainClass}__options`, {
            [`${mainClass}__options--empty`]: !!!value?.length,
          })}
        >
          <div className={`${mainClass}__options__wrapper`}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {formatted_value?.map((item, index) => (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={classnames(
                              `${mainClass}__options__item`,
                              {
                                [`endpoints_table_section--dragging`]:
                                  !!snapshot?.isDragging,
                              }
                            )}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getItemStyle(provided.draggableProps.style)}
                          >
                            <div
                              className={`${mainClass}__options__item__label`}
                            >
                              <IconButton
                                size="small"
                                variant="light"
                                {...provided.dragHandleProps}
                                icon={<EllipsisVerticalIcon />}
                              />
                              <p>{item?.label}</p>
                            </div>
                            <IconButton
                              onClick={() => removeMiddleware(item?.value)}
                              variant="light"
                              size="small"
                              icon={<XMarkIcon />}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          {value?.length !== options?.length && (
            <div className={`${mainClass}__options__bottom`}>
              <Select
                onChange={({ target }) => appendMiddleware(target?.value)}
                options={formatted_options?.map((item) => ({
                  label: item?.label,
                  value: item?.value,
                }))}
                CustomButton={() => (
                  <TransparentButton
                    label="Add middleware"
                    icon={<PlusIcon />}
                    variant="transparent"
                  />
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DragOrderSelect;
