import { useState } from "react";

export const useImageModal = (images = []) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigateToImage = (index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  };

  return {
    isOpen,
    currentIndex,
    openModal,
    closeModal,
    navigateToImage,
  };
};
