import React from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
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
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        {children}
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
    </ModalOverlay>
  );
};

export default Modal;
