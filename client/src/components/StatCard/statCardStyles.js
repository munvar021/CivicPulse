import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StatCardContainer = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${theme.liquidGlass.boxShadow};
  text-align: center;
  border-left: 4px solid ${({ color }) => color || theme.colors.primary.main};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    background: ${theme.liquidGlassHover.background};
    box-shadow: ${theme.liquidGlassHover.boxShadow};
  }
`;

export const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
