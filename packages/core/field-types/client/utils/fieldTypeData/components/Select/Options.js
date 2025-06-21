import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DragOrderSelect from "./DragOrderSelect.js";

import AddIcon from "@mui/icons-material/Add";

const Options = ({ value = [], onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1 }}
      >
        <Typography>Options</Typography>
        <IconButton
          size="micro"
          aria-describedby={id}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <AddIcon />
        </IconButton>
        <InputPopover
          id={id}
          open={open}
          value={value}
          anchorEl={anchorEl}
          onChange={onChange}
          setAnchorEl={setAnchorEl}
        />
      </Stack>
      <DragOrderSelect data={value} onChange={onChange} />
    </Box>
  );
};

const InputPopover = ({ id, open, anchorEl, setAnchorEl, value, onChange }) => {
  const [newOptionValue, setNewOptionValue] = useState("");

  const onAddOption = () => {
    setAnchorEl(false);
    setNewOptionValue("");
    onChange([
      ...value,
      { label: newOptionValue, value: newOptionValue, color: "pink" },
    ]);
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
        gap={0}
        sx={{ px: 0.5 }}
        // component="form"
        // onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoFocus={true}
          data-1p-ignore
          value={newOptionValue}
          onChange={(e) => setNewOptionValue(e.target.value)}
          style={{
            padding: "0 10px",
            height: "41px",
            width: "120px",
            border: "none",
            outlineWidth: 0,
            backgroundColor: "transparent",
          }}
        />
        <Button
          size="small"
          type="submit"
          onClick={onAddOption}
          // disabled={!formik?.dirty}
          // loading={formik?.isSubmitting}
        >
          Add
        </Button>
      </Stack>
    </Popover>
  );
};

export default Options;
