export const initScrollReactiveLighting = () => {
  const handleScroll = () => {
    const y = window.scrollY;
    const intensity = Math.min(0.12, 0.08 + y / 5000);
    document.documentElement.style.setProperty("--light-intensity", intensity);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
};
