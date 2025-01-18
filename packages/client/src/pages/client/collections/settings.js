import CollectionProvider from "context/client/collection";
import CollectionSettingsContent from "page_components/collections/Settings";

const CollectionSettings = () => (
  <CollectionProvider>
    <CollectionSettingsContent />
  </CollectionProvider>
);

export default CollectionSettings;
