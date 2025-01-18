import CollectionContent from "page_components/collections/CurrentContent";
import CollectionProvider from "context/client/collection";

const Collection = ({ archived }) => (
  <CollectionProvider archived={archived}>
    <CollectionContent />
  </CollectionProvider>
);

export default Collection;
