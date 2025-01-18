import "./styles.scss";

import classnames from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import FormItem from "./components/FormItem";
import EndpointItem from "./components/EndpointItem";
import LabelChanger from "./components/LabelChanger";
import FormFieldItem from "./components/FormFieldItem";
import FormIncomingItem from "./components/FormIncomingItem";

const mainClass = "list";

const list_item_render = (type, item, key, provided, snapshot) => {
  switch (type) {
    case "endpoints":
      return <EndpointItem {...item} key={key} />;
    case "forms":
      return <FormItem {...item} key={key} />;
    case "forms_incoming":
      return <FormIncomingItem {...item} key={key} />;
    case "forms_field":
      return (
        <FormFieldItem
          {...item}
          key={key}
          provided={provided}
          snapshot={snapshot}
        />
      );
    default:
      return null;
  }
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const List = ({ type, data, onOrderChange }) => {
  if (data?.length === 0) return null;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      data?.[0]?.items,
      result.source.index,
      result.destination.index
    );

    onOrderChange(items);
  };

  return (
    <div className={mainClass}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {data?.map((item, index) => (
                <div
                  key={index}
                  className={classnames(`${mainClass}__section`, {
                    [`${mainClass}__section--dragging`]:
                      !!snapshot?.isDraggingOver,
                  })}
                >
                  {!!item?.group && <LabelChanger data={item?.group} />}
                  <div key={index} className={`${mainClass}__section__items`}>
                    {item?.items?.map((item, index) =>
                      !!onOrderChange ? (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}
                        >
                          {(provided, snapshot) =>
                            list_item_render(
                              type,
                              item,
                              data?.length + index,
                              provided,
                              snapshot
                            )
                          }
                        </Draggable>
                      ) : (
                        list_item_render(
                          type,
                          item,
                          data?.length + index,
                          provided,
                          snapshot
                        )
                      )
                    )}
                  </div>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;
