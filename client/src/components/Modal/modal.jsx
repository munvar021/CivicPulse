import React from "react";
import ReactDOM from "react-dom";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalBody,
  ButtonGroup,
} from "./modalStyles";
import { StyledButton } from "../Button/buttonStyles";
import ButtonLoader from "../Loaders/buttonLoader";

const Modal = ({
  title,
  children,
  onClose,
  onSave,
  saveLabel = "Save",
  isLoading = false,
}) => {
  const handleOverlayClick = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <ModalBody>{children}</ModalBody>
        <ButtonGroup>
          <StyledButton onClick={onSave} disabled={isLoading}>
            {isLoading ? <ButtonLoader size="small" /> : saveLabel}
          </StyledButton>
          <StyledButton
            onClick={onClose}
            disabled={isLoading}
            variant="secondary"
          >
            Cancel
          </StyledButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>,
    document.body,
  );
};

export default Modal;
