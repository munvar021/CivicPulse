import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { ScrollButton } from "./scrollToTopStyles";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisible, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return undefined;
    const previousValue = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousValue;
    };
  }, []);

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return (
    <ScrollButton
      $visible={visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </ScrollButton>
  );
};

export default ScrollToTop;
