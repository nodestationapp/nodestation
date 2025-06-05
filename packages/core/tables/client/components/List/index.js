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
import MuiList from "@mui/material/List";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import FormFieldItem from "./components/FormFieldItem/index.js";

const list_item_render = (type, item, key, disabled) => {
  switch (type) {
    case "endpoints":
      return <EndpointItem {...item} key={key} />;
    case "forms":
      return <FormItem {...item} key={key} />;
    case "forms_incoming":
      return <FormIncomingItem {...item} key={key} />;
    case "forms_field":
      return <FormFieldItem {...item} key={key} disabled={disabled} />;
    default:
      return null;
  }
};

const List = ({ type, data: value, onOrderChange, disabled }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const oldIndex = value.findIndex((v) => v?.slug === active.id);
          const newIndex = value.findIndex((v) => v?.slug === over.id);

          const reorder = arrayMove(value, oldIndex, newIndex);

          onOrderChange(reorder);
        }
      }}
    >
      <SortableContext
        items={value?.map((item) => item?.slug)}
        disabled={process.env.NODE_ENV !== "development"}
      >
        <MuiList dense variant="bordered">
          {value?.map((item, index) =>
            list_item_render(type, item, value?.length + index, disabled)
          )}
        </MuiList>
      </SortableContext>
    </DndContext>
  );
};

export default List;
