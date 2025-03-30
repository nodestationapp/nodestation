import { fn } from "@storybook/test";
import Button from "../components/Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "transparent-gray",
        "transparent",
        "no-border",
        "no-border-grey",
        "no-border-error",
        "grey",
        "green",
        "red",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium"],
    },
    href: { control: true },
    _blank: { control: false },
    icon: {
      control: "select",
      options: [null, "PlusIcon"],
    },
  },
};

export const Base = {
  args: {
    icon: null,
    onClick: fn(),
    size: "medium",
    loading: false,
    children: "Add",
    disabled: false,
    fullWidth: false,
    variant: "primary",
  },
};
