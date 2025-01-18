import path from "path";

const rootPath = () => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);

  const parts = __dirname.split(path.sep);
  const index = parts.findIndex(
    (part) => part === "node_modules" || part === "packages"
  );
  if (index !== -1) {
    const trimmedPath = parts.slice(0, index).join(path.sep);
    return trimmedPath;
  }
  throw new Error("Directory not found in the current path.");
};

export default rootPath();
