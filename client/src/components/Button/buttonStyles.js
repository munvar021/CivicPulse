import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: ${theme.liquidGlass.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: fit-content;

  ${({ $variant }) => {
    switch ($variant) {
      case "primary":
        return `
          background: ${theme.colors.glass.base};
          backdrop-filter: blur(20px);
          color: ${theme.colors.text.primary};
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          &:hover {
            background: ${theme.colors.glass.base};
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 255, 255, 0.1);
          }
        `;
      case "secondary":
        return `
          background: ${theme.colors.glass.muted};
          color: ${theme.colors.text.primary};
          backdrop-filter: blur(10px);
          &:hover {
            background: ${theme.colors.glass.base};
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
        `;
      case "danger":
        return `
          background: ${theme.colors.status.danger};
          color: ${theme.colors.text.primary};
          &:hover {
            background: #dc2626;
            transform: translateY(-2px);
          }
        `;
      case "success":
        return `
          background: ${theme.colors.status.success};
          color: ${theme.colors.text.primary};
          &:hover {
            background: #059669;
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: ${theme.colors.glass.base};
          backdrop-filter: blur(20px);
          color: ${theme.colors.text.primary};
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;
