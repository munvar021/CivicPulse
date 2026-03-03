import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 140px 2rem 3rem 2rem;
  min-height: 100vh;
`;

export const PageTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 2rem;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

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

export const DeleteActionButton = styled.button`
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(239, 68, 68, 0.3);
    transform: translateY(-2px);
  }
`;
