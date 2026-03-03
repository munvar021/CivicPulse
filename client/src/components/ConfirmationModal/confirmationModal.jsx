import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSignOutAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  ModalOverlay,
  ModalContent,
  IconWrapper,
  Title,
  Message,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
} from "./confirmationModalStyles";
import ButtonLoader from "../Loaders/buttonLoader";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "delete",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "logout":
        return faSignOutAlt;
      case "delete":
        return faTrash;
      default:
        return faExclamationTriangle;
    }
  };

  const getConfirmText = () => {
    switch (type) {
      case "logout":
        return "Logout";
      case "delete":
        return "Delete";
      default:
        return "Confirm";
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <IconWrapper $type={type}>
          <FontAwesomeIcon icon={getIcon()} />
        </IconWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <CancelButton onClick={onClose} disabled={isLoading}>
            Cancel
          </CancelButton>
          <ConfirmButton onClick={onConfirm} disabled={isLoading} $type={type}>
            {isLoading ? <ButtonLoader size="small" /> : getConfirmText()}
          </ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
