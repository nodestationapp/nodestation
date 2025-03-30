import { fn } from "@storybook/test";
import Alert from "../components/Alert";

export default {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export const Base = {
  args: {
    text: "This is an alert",
    action: {
      label: "Click me",
      onClick: fn(),
    },
  },
};
