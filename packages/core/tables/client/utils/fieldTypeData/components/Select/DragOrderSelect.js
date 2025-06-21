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

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";

import { CSS } from "@dnd-kit/utilities";

import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const DragOrderSelectContent = ({ data = [], onChange }) => {
  const removeItem = (item) => {
    let temp = [...data];

    const index = temp?.findIndex((element) => element?.value === item);

    temp.splice(index, 1);

    onChange(temp);
  };

  const onChangeColor = (item, color) => {
    let temp = [...data];

    const index = temp?.findIndex((element) => element?.value === item);

    temp[index].color = color;

    onChange(temp);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
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
            removeItem={removeItem}
            onChangeColor={onChangeColor}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

const DragOrderSelectItem = ({ id, data, removeItem, onChangeColor }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const popover_id = open ? "simple-popover" : undefined;

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Box ref={setNodeRef} style={style}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={0.5}
      >
        <Stack direction="row" alignItems="center" gap={0.5}>
          <IconButton
            {...attributes}
            {...listeners}
            size="micro"
            sx={{ ml: -1 }}
          >
            <MoreVertIcon />
          </IconButton>
          <Box
            aria-describedby={popover_id}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Chip
              label={data?.label}
              color={data?.color}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <ColorPickerPopover
            open={open}
            id={popover_id}
            anchorEl={anchorEl}
            onChangeColor={(color) => onChangeColor(data?.value, color)}
            setAnchorEl={setAnchorEl}
          />
        </Stack>
        <IconButton
          size="micro"
          aria-describedby={id}
          onClick={() => removeItem(data?.value)}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

const ColorPickerPopover = ({
  id,
  open,
  anchorEl,
  setAnchorEl,
  onChangeColor,
}) => {
  const changeColor = (color) => {
    setAnchorEl(false);
    onChangeColor(color);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={0.7}
        sx={{ px: 0.5, py: 0.5 }}
      >
        <Box
          onClick={() => changeColor("success")}
          sx={{
            cursor: "pointer",
            backgroundColor: "success.light",
            height: 30,
            width: 30,
            borderRadius: 0.5,
          }}
        ></Box>
        <Box
          onClick={() => changeColor("error")}
          sx={{
            cursor: "pointer",
            backgroundColor: "error.light",
            height: 30,
            width: 30,
            borderRadius: 0.5,
          }}
        ></Box>
        <Box
          onClick={() => changeColor("pink")}
          sx={{
            cursor: "pointer",
            backgroundColor: "#f655f6",
            height: 30,
            width: 30,
            borderRadius: 0.5,
          }}
        ></Box>
      </Stack>
    </Popover>
  );
};

export default DragOrderSelectContent;
