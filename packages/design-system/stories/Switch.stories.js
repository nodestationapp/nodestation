import { fn } from "@storybook/test";
import Switch from "../components/form/Switch";

export default {
  title: "Form/Switch",
  component: Switch,
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
