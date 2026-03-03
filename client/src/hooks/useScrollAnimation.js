import { useEffect, useRef, useState, useCallback } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) return;

    const rafId = requestAnimationFrame(() => {
      const rect = currentRef.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: "0px",
      },
    );

    observer.observe(currentRef);

    return () => {
      cancelAnimationFrame(rafId);
      observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [ref, isVisible];
};
