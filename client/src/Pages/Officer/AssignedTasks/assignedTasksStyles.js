import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ActionButton = styled.button`
  padding: 0.5rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

export const CompleteButton = styled.button`
  padding: 0.5rem;
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(34, 197, 94, 0.3);
    transform: translateY(-2px);
  }
`;
