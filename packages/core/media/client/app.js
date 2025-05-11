import { Route, Routes } from "react-router-dom";

import MediaIndex from "./media.js";
import MediaSettings from "./settings.js";
import MediaProvider from "./contexts/media.js";
const Media = () => {
  return (
    <MediaProvider>
      <Routes>
        <Route index element={<MediaIndex />} />
        <Route path="settings" element={<MediaSettings />} />
      </Routes>
    </MediaProvider>
  );
};

export default Media;
