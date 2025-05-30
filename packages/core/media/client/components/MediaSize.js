const formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const num = (bytes / Math.pow(k, i)).toFixed(2);
  return `${num} ${sizes[i]}`;
};

const MediaSize = ({ size }) => {
  return formatBytes(size) || "-";
};

export default MediaSize;
