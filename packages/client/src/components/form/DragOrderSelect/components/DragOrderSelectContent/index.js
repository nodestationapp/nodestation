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
  onChange,
  itemAction,
  LabelComponent,
  actionAlwaysVisible,
}) => {
  const removeItem = (item) => {
    let temp = [...data];

    const index = temp?.findIndex((element) => element === item);

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
            const oldIndex = data.findIndex((v) => v?.value === active.id);
            const newIndex = data.findIndex((v) => v?.value === over.id);

            const reorder = arrayMove(data, oldIndex, newIndex);

            onChange(reorder);
          }
        }}
      >
        <SortableContext items={data?.map((item) => item?.value)}>
          {data?.map((item) => (
            <DragOrderSelectItem
              id={item?.value}
              key={item?.value}
              data={item}
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
  removeItem,
  disabled,
  itemAction: ItemAction,
  actionAlwaysVisible,
  LabelComponent,
}) => {
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
      className={cx(`${mainClass}__item`, {
        [`${mainClass}__item--disabled`]: !!disabled,
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
          <LabelComponent id={id} label={data?.label} color={data?.color} />
        ) : (
          <p>{data?.label}</p>
        )}
      </div>
      {!!ItemAction ? (
        <ItemAction id={id} />
      ) : (
        <IconButton
          onClick={() => removeItem(data?.value)}
          size="small"
          icon={<XMarkIcon />}
        />
      )}
    </div>
  );
};

export default DragOrderSelectContent;
