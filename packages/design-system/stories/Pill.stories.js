import { fn } from "@storybook/test";
import Pill from "../components/Pill";

export default {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "small"],
    },
    icon: {
      control: "select",
      options: [null, "PlusIcon"],
    },
    variant: {
      control: "select",
      options: ["default", "rounded"],
    },
  },
};

export const Base = {
  args: {
    label: "This is a pill",
    active: false,
    readOnly: true,
    size: "large",
    color: "green",
    textColor: "#FFFFFF",
    icon: "PlusIcon",
    variant: "rounded",
    onclick: fn(),
  },
};
