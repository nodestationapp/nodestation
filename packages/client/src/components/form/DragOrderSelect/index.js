import "./styles.scss";

import {
  useSensor,
  DndContext,
  useSensors,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import classnames from "classnames";
import { CSS } from "@dnd-kit/utilities";
import { useState, useRef } from "react";

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

  const formatted_value = value?.map((item) => ({
    label: options?.find((element) => element?.value === item)?.label,
    value: item,
  }));

  const formatted_options = options?.filter(
    (item) => !value?.includes(item?.value)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
            <DndContext
              sensors={sensors}
              onDragEnd={({ active, over }) => {
                if (over && active.id !== over?.id) {
                  const oldIndex = value.findIndex((v) => v === active.id);
                  const newIndex = value.findIndex((v) => v === over.id);

                  const reorder = arrayMove(value, oldIndex, newIndex);

                  onChange({ target: { value: reorder } });
                }
              }}
            >
              <SortableContext
                items={formatted_value?.map((item) => item?.value)}
              >
                {formatted_value?.map((item) => (
                  <DragOrderSelectItem
                    id={item?.value}
                    key={item?.value}
                    data={item}
                    removeMiddleware={removeMiddleware}
                  />
                ))}
              </SortableContext>
            </DndContext>
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

const DragOrderSelectItem = ({ id, data, removeMiddleware }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      className={`${mainClass}__options__item`}
      style={style}
      ref={setNodeRef}
    >
      <div className={`${mainClass}__options__item__label`}>
        <IconButton
          {...attributes}
          {...listeners}
          size="small"
          variant="light"
          icon={<EllipsisVerticalIcon />}
        />
        <p>{data?.label}</p>
      </div>
      <IconButton
        onClick={() => removeMiddleware(data?.value)}
        variant="light"
        size="small"
        icon={<XMarkIcon />}
      />
    </div>
  );
};

export default DragOrderSelect;
