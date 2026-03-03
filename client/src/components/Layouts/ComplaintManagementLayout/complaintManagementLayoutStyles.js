import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const ActionButton = styled.button`
  padding: 0.5rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;

  &:hover {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    font-size: 0.85rem;
    min-width: 32px;
    height: 32px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const AssignActionButton = styled(ActionButton)`
  background: #10b981;

  &:hover {
    background: #059669;
  }
`;
