import styled from "styled-components";
import { theme } from "../../styles/theme";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease-out 0.4s both;

  @keyframes fadeInUp {
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
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
`;

export const PageButton = styled.button`
  padding: 0.75rem 1rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;

  &:hover:not(:disabled) {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    min-width: 40px;
  }
`;

export const PageNumberButton = styled.button`
  padding: 0.75rem 1rem;
  background: ${({ $active }) =>
    $active ? "rgba(59, 130, 246, 0.2)" : theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${({ $active }) => ($active ? "#60a5fa" : theme.colors.text.primary)};
  border: ${({ $active }) =>
    $active ? "1px solid rgba(59, 130, 246, 0.5)" : theme.liquidGlass.border};
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 44px;

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(59, 130, 246, 0.3)" : theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    min-width: 40px;
  }
`;

export const PageInfo = styled.span`
  color: ${theme.colors.text.primary};
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0 0.5rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0 0.25rem;
  }
`;
