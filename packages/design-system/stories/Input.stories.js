import Input from "../components/form/Input";

export default {
  title: "Form/Input",
  component: Input,
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
    label: "Input",
    disabled: false,
    size: "medium",
    type: "text",
    variant: "light",
    required: false,
  },
};
