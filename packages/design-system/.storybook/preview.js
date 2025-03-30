/** @type { import('@storybook/react').Preview } */

import "../styles/globals.scss";
import { themes } from "@storybook/theming";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
