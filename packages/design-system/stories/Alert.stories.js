import Alert from "../components/Alert";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Base = {
  args: {
    text: "This is an alert",
    action: {
      label: "Click me",
      href: "/emails/settings",
    },
  },
};
