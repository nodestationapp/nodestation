import { useState, useEffect } from "react";

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        return;
      }

      if (entry.boundingClientRect.top > 0) {
        setIntersecting(false);
      } else {
        setIntersecting(false);
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "0px 0px -300px 0px",
    }
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return isIntersecting;
}
