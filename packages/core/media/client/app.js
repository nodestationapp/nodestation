import { Route, Routes } from "react-router-dom";

import MediaIndex from "./media.js";
import MediaSettings from "./settings.js";

const Media = () => {
  return (
    <Routes>
      <Route index element={<MediaIndex />} />
      <Route path="settings" element={<MediaSettings />} />
    </Routes>
  );
};

export default Media;
