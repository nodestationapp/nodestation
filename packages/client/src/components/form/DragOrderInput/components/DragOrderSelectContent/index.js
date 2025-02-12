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
  data,
  onChange,
  value = [],
  itemAction,
  actionAlwaysVisible,
}) => {
  const removeMiddleware = (item) => {
    let temp = [...value];

    const index = temp?.findIndex((element) => element === item);

    temp.splice(index, 1);

    onChange({ target: { value: temp } });
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

            onChange({ target: { value: reorder } });
          }
        }}
      >
        <SortableContext items={data?.map((item) => item?.value)}>
          {data?.map((item) => (
            <DragOrderSelectItem
              id={item?.value}
              key={item?.value}
              data={item}
              disabled={item?.disabled}
              itemAction={itemAction}
              removeMiddleware={removeMiddleware}
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
  removeMiddleware,
  disabled,
  itemAction: ItemAction,
  actionAlwaysVisible,
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
        <p>{data?.label}</p>
      </div>
      {!!ItemAction ? (
        <ItemAction id={id} />
      ) : (
        <IconButton
          onClick={() => removeMiddleware(data?.value)}
          size="small"
          icon={<XMarkIcon />}
        />
      )}
    </div>
  );
};

export default DragOrderSelectContent;
