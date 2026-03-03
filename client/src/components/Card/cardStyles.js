import styled from "styled-components";
import { theme } from "../../styles/theme";

export const CardContainer = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${theme.liquidGlass.boxShadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};

  &:hover {
    ${({ onClick }) =>
      onClick &&
      `
      transform: translateY(-4px);
      background: ${theme.liquidGlassHover.background};
      box-shadow: ${theme.liquidGlassHover.boxShadow};
    `}
  }
`;

export const CardTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const CardContent = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;

  & > p {
    align-self: flex-start;
  }

  & > button {
    align-self: flex-end;
  }
`;
