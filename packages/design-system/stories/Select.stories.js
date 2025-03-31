import Select from "../components/form/Select";

export default {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "select",
      options: [null, "option1", "option2", "option3"],
    },
  },
};

export const Base = {
  args: {
    label: "My select",
    disabled: false,
    variant: "light",
    required: false,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    selected: { label: "Option 1", value: "option1" },
    onChange: () => {},
    value: null,
  },
};
