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
import cx from "classnames";
import { CSS } from "@dnd-kit/utilities";

import IconButton from "components/IconButton";

import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mainClass = "drag-order-select__content";

const DragOrderSelectContent = ({
  data = [],
  value = [],
  onChange,
  itemAction,
  LabelComponent,
  actionAlwaysVisible,
}) => {
  const removeItem = (item) => {
    let temp = [...value];

    const index = temp?.findIndex(
      (element) => element?.value || element === item
    );

    temp.splice(index, 1);

    onChange(temp);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className={mainClass}>
      <DndContext
        sensors={sensors}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over?.id) {
            const oldIndex = value.findIndex((v) => v === active.id);
            const newIndex = value.findIndex((v) => v === over.id);

            const reorder = arrayMove(value, oldIndex, newIndex);

            onChange(reorder);
          }
        }}
      >
        <SortableContext items={value?.map((item) => item)}>
          {value?.map((item) => (
            <DragOrderSelectItem
              id={item}
              key={item}
              value={item}
              data={data}
              onChange={onChange}
              LabelComponent={LabelComponent}
              disabled={item?.disabled}
              itemAction={itemAction}
              removeItem={removeItem}
              actionAlwaysVisible={actionAlwaysVisible}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

const DragOrderSelectItem = ({
  id,
  data,
  value,
  removeItem,
  LabelComponent,
  actionAlwaysVisible,
  itemAction: ItemAction,
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const currentValue = data?.find((item) => item?.value === value);

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      className={cx(`${mainClass}__item`, {
        [`${mainClass}__item--disabled`]: !!currentValue?.disabled,
        [`${mainClass}__item--action-visible`]: !!actionAlwaysVisible,
      })}
      style={style}
      ref={setNodeRef}
    >
      <div className={`${mainClass}__item__label`}>
        <IconButton
          {...attributes}
          {...listeners}
          size="small"
          icon={<EllipsisVerticalIcon />}
        />
        {!!LabelComponent ? (
          <LabelComponent
            id={id}
            label={currentValue?.label}
            color={currentValue?.color}
          />
        ) : (
          <p>{currentValue?.label}</p>
        )}
      </div>
      {!!ItemAction ? (
        <ItemAction id={id} />
      ) : (
        <IconButton
          onClick={() => removeItem(currentValue?.label)}
          size="small"
          icon={<XMarkIcon />}
        />
      )}
    </div>
  );
};

export default DragOrderSelectContent;
