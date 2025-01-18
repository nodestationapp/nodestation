import "./styles.scss";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const mainClass = "title-bar__searcher";

const Searcher = () => {
  return (
    <button className={mainClass}>
      <MagnifyingGlassIcon />
      Search
    </button>
  );
};

export default Searcher;
