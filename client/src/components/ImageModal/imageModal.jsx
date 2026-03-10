import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalImage,
  NavigationButton,
  ImageCounter,
} from "./imageModalStyles";

const ImageModal = ({ isOpen, onClose, images, currentIndex, onNavigate }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>

        {images.length > 1 && (
          <>
            {currentIndex > 0 && (
              <NavigationButton
                direction="left"
                onClick={() => onNavigate(currentIndex - 1)}
                aria-label="Previous image"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </NavigationButton>
            )}

            {currentIndex < images.length - 1 && (
              <NavigationButton
                direction="right"
                onClick={() => onNavigate(currentIndex + 1)}
                aria-label="Next image"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </NavigationButton>
            )}

            <ImageCounter>
              {currentIndex + 1} / {images.length}
            </ImageCounter>
          </>
        )}

        <ModalImage
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
        />
      </ModalContent>
    </ModalOverlay>,
    document.body,
  );
};

export default ImageModal;
