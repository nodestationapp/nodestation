import { useState } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import field_type_data from "../../../../utils/field_type_data.js";

import MoreVert from "@mui/icons-material/MoreVert";
import LockOutline from "@mui/icons-material/LockOutline";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const FormFieldItem = ({
  name,
  slug,
  type,
  onclick,
  onRemoveClick,
  primary_key,
  origin,
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slug });
  const [archive_modal, setArchiveModal] = useState(false);
  const [is_grabbing, setIsGrabbing] = useState(false);

  const style = {
    opacity: isDragging && !!slug ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const current_type = field_type_data?.find((item) => item?.value === type);

  return (
    <>
      <ListItem
        key={slug}
        ref={setNodeRef}
        style={style}
        variant="bordered"
        onClick={onclick}
      >
        <ListItemButton>
          <IconButton
            size="micro"
            variant="light"
            {...listeners}
            {...attributes}
            sx={{ mr: 1.5, cursor: !!is_grabbing ? "grabbing" : "grab" }}
            onMouseDown={() => setIsGrabbing(true)}
            onMouseLeave={() => setIsGrabbing(false)}
          >
            <MoreVert />
          </IconButton>
          <Stack direction="row" alignItems="center" gap={2}>
            {current_type?.icon}
            <Stack direction="column" gap={0}>
              <Typography variant="body1">{name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {slug}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 3 }}>
            {!!primary_key && <Chip label="Primary key" size="small" />}
          </Stack>
          {origin === "system" && <LockOutline sx={{ ml: "auto" }} />}
          {/* //todo */}
          {origin !== "system" && (
            <IconButton
              sx={{ ml: "auto" }}
              color="secondary"
              size="micro"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveClick();
              }}
              // icon={<TrashIcon color="#FF3636" />}
            >
              <DeleteOutline />
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      {/* {!!archive_modal && (
        <ArchiveEmailModal
          data={archive_modal}
          type="list"
          onClose={() => setArchiveModal(false)}
        />
      )} */}
    </>
  );
};

export default FormFieldItem;
