import { fn } from "@storybook/test";
import Checkbox from "../components/form/Checkbox";

export default {
  title: "Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    name: { control: false },
  },
};

export const Base = {
  args: {
    label: "This is label",
    disabled: false,
  },
};
