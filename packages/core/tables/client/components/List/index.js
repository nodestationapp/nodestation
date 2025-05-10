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
import { List as MuiList } from "@mui/material";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import FormFieldItem from "./components/FormFieldItem/index.js";

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
      <SortableContext items={value?.map((item) => item?.slug)}>
        <MuiList
          dense
          // sx={{ width: "100%", bgcolor: "background.paper" }}
          variant="bordered"
        >
          {value?.map((item, index) =>
            list_item_render(type, item, value?.length + index, index)
          )}
        </MuiList>
      </SortableContext>
    </DndContext>
  );
};

export default List;
