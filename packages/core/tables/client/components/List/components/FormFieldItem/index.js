import { useState } from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { clientContentTypes } from "@nstation/content-types";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

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
  disabled,
  required,
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

  const current_type = clientContentTypes()?.find((item) => item?.key === type);

  return (
    <>
      <ListItem
        key={slug}
        ref={setNodeRef}
        style={style}
        sx={!!disabled ? { pointerEvents: "none" } : null}
        variant="bordered"
        onClick={onclick}
      >
        <ListItemButton>
          {process.env.NODE_ENV === "development" && (
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
          )}
          <Stack
            direction="row"
            alignItems="center"
            gap={2}
            ml={process.env.NODE_ENV === "development" ? 0 : 1}
          >
            {current_type?.icon}
            <Stack direction="column" gap={0}>
              <Typography variant="body1">{name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {slug}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1} ml="auto">
            {!!primary_key && <Chip label="Primary key" size="small" />}
            {!!required && <Chip label="Required" size="small" />}
            {(origin === "system" ||
              process.env.NODE_ENV !== "development") && (
              <LockOutline sx={{ ml: "auto" }} />
            )}
            {origin !== "system" && process.env.NODE_ENV === "development" && (
              <IconButton
                sx={{ ml: "auto" }}
                color="secondary"
                size="micro"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveClick();
                }}
              >
                <DeleteOutline />
              </IconButton>
            )}
          </Stack>
          {/* //todo */}
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
