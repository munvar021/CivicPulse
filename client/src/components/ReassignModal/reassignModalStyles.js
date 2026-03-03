import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;

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
  background: rgba(30, 30, 30, 0.95);
  border-radius: 16px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.3s ease;

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
    max-width: 95%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    padding: 1.25rem 1.5rem;
  }
`;

export const ModalTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 1.25rem;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.text.secondary};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "#ef4444" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 12px;
  color: ${theme.colors.text.primary};
  resize: vertical;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) =>
      $hasError ? "#ef4444" : "rgba(102, 126, 234, 0.5)"};
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "#ef4444" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 12px;
  color: ${theme.colors.text.primary};
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) =>
      $hasError ? "#ef4444" : "rgba(102, 126, 234, 0.5)"};
    background: rgba(255, 255, 255, 0.08);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: 0.875rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${theme.colors.text.secondary};
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;
