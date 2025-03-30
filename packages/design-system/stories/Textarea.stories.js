import Textarea from "../components/form/Textarea";

export default {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    variant: {
      control: "select",
      options: ["light", "brighter", "transparent"],
    },
  },
};

export const Base = {
  args: {
    label: "Textarea",
    disabled: false,
    required: false,
  },
};
