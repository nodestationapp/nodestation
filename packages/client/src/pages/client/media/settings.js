import MediaProvider from "context/client/media";
import MediaContentSettings from "page_components/media/Settings";

const MediaSettings = () => (
  <MediaProvider>
    <MediaContentSettings />
  </MediaProvider>
);

export default MediaSettings;
