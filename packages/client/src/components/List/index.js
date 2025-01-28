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
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import FormItem from "./components/FormItem";
import EndpointItem from "./components/EndpointItem";
import FormFieldItem from "./components/FormFieldItem";
import FormIncomingItem from "./components/FormIncomingItem";

const mainClass = "list";

const list_item_render = (type, item, key) => {
  switch (type) {
    case "endpoints":
      return <EndpointItem {...item} key={key} />;
    case "forms":
      return <FormItem {...item} key={key} />;
    case "forms_incoming":
      return <FormIncomingItem {...item} key={key} />;
    case "forms_field":
      return <FormFieldItem {...item} key={key} />;
    default:
      return null;
  }
};

const List = ({ type, data: value, onOrderChange }) => {
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
            const oldIndex = value.findIndex((v) => v?.slug === active.id);
            const newIndex = value.findIndex((v) => v?.slug === over.id);

            const reorder = arrayMove(value, oldIndex, newIndex);

            onOrderChange(reorder);
          }
        }}
      >
        <SortableContext items={value?.map((item) => item?.slug)}>
          <div className={`${mainClass}__content`}>
            {value?.map((item, index) => (
              <div key={index} className={`${mainClass}__content__row`}>
                {list_item_render(type, item, value?.length + index)}
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default List;
