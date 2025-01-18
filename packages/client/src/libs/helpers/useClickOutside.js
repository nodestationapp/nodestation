import { useEffect } from "react";

const useClickOutside = (ref, onTrigger) => {
  const onClose = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onTrigger();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClose);
    return () => document.removeEventListener("mousedown", onClose);
    // eslint-disable-next-line
  }, []);

  return null;
};

export default useClickOutside;
