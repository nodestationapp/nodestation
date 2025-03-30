import Icon from "../components/Icon";

export default {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["PlusIcon"],
    },
  },
};

export const Base = {
  args: {
    name: "PlusIcon",
  },
};
