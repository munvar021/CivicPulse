import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.6);
    box-shadow: 0 0 0 1px rgba(102, 126, 234, 0.6);
    background: rgba(255, 255, 255, 0.08);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.text.primary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.6);
    box-shadow: 0 0 0 1px rgba(102, 126, 234, 0.6);
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.85rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const HiddenSubmitButton = styled.button`
  display: none;
`;

export const ConditionalInputGroup = styled.div`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  flex-direction: column;
  gap: 0.5rem;
`;

export const SmallText = styled.small`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
`;
