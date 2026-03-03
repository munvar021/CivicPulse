import styled from "styled-components";
import { theme } from "../../styles/theme";
import { fadeIn, scaleIn } from "../../styles/animations";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 20px;
  padding: 2.5rem;
  width: 90%;
  max-width: 450px;
  box-shadow: ${theme.liquidGlass.boxShadow};
  animation: ${scaleIn} 0.3s ease-out;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 16px;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 14px;
  }
`;

export const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 2.5rem;
  background: ${({ $type }) => {
    switch ($type) {
      case "logout":
        return "rgba(59, 130, 246, 0.15)";
      case "delete":
        return "rgba(239, 68, 68, 0.15)";
      default:
        return "rgba(245, 158, 11, 0.15)";
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case "logout":
        return theme.colors.primary.main;
      case "delete":
        return theme.colors.status.danger;
      default:
        return theme.colors.status.warning;
    }
  }};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 2.25rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};

  @media (max-width: 768px) {
    font-size: 1.35rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

export const Message = styled.p`
  margin: 0 0 2rem 0;
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
`;

export const CancelButton = styled.button`
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: ${theme.liquidGlass.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${theme.colors.glass.muted};
  color: ${theme.colors.text.primary};
  backdrop-filter: blur(10px);
  min-width: 120px;

  &:hover:not(:disabled) {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
`;

export const ConfirmButton = styled.button`
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${theme.colors.text.primary};
  min-width: 120px;
  background: ${({ $type }) => {
    switch ($type) {
      case "logout":
        return theme.colors.primary.main;
      case "delete":
        return theme.colors.status.danger;
      default:
        return theme.colors.status.warning;
    }
  }};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    background: ${({ $type }) => {
      switch ($type) {
        case "logout":
          return theme.colors.primary.dark;
        case "delete":
          return "#dc2626";
        default:
          return "#d97706";
      }
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
`;
