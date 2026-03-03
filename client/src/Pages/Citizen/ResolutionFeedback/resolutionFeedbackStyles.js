import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const ProofSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 12px;

  h3 {
    margin: 0 0 1rem 0;
    color: ${theme.colors.text.primary};
  }

  p {
    margin: 0.5rem 0 0 0;
    color: ${theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

export const ProofImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

export const RatingSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const StarContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Star = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${({ filled }) => (filled ? "#fbbf24" : "#4b5563")};
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(10px);
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  color: ${theme.colors.text.primary};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
`;
