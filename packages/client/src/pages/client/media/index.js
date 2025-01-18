import MediaContent from "page_components/media/Content";
import MediaProvider from "context/client/media";

const Media = () => (
  <MediaProvider>
    <MediaContent />
  </MediaProvider>
);

export default Media;
