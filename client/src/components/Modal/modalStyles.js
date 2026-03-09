import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: visible;
  box-shadow: ${theme.liquidGlass.boxShadow};
  animation: slideUp 0.3s ease-out;
  display: flex;
  flex-direction: column;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 14px;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 1.35rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 -0.5rem;
  padding: 0 0.5rem;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;

    button {
      width: 100%;
    }
  }
`;
