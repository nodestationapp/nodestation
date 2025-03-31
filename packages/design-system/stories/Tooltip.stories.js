import Tooltip from "../components/Tooltip";

export default {
  title: "Components/Tooltip",
  parameters: {
    layout: "centered",
  },
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["bottom", "right"],
    },
  },
};

export const Base = {
  args: {
    text: "This is a tooltip",
    position: "bottom",
    children: <span style={{ color: "#fff", fontSize: 14 }}>Hover me</span>,
  },
};
