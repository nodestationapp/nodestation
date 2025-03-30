import Loader from "../components/Loader";

export default {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "large"],
    },
    color: {
      control: "select",
      options: ["dark", "light"],
    },
  },
};

export const Base = {
  args: {
    size: "small",
    color: "light",
  },
};
