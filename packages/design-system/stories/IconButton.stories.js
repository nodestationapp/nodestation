import { fn } from "@storybook/test";
import IconButton from "../components/IconButton";

export default {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    variant: {
      control: "select",
      options: ["default", "error"],
    },
  },
};

export const Base = {
  args: {
    icon: "PlusIcon",
    onClick: fn(),
    size: "medium",
    type: "button",
    variant: "default",
    active: false,
  },
};
