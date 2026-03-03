import styled from "styled-components";
import { getColorWithOpacity } from "../../utils/colorMapper";
import { scaleIn } from "../../styles/animations";

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: ${({ $variant }) =>
    $variant === "small" ? "0.25rem 0.5rem" : "0.375rem 0.75rem"};
  border-radius: 1rem;
  font-size: ${({ $variant }) =>
    $variant === "small" ? "0.75rem" : "0.875rem"};
  font-weight: 600;
  color: ${({ color }) => color};
  background: ${({ color }) => getColorWithOpacity(color, 0.15)};
  border: 1px solid ${({ color }) => getColorWithOpacity(color, 0.3)};
  white-space: nowrap;
  width: fit-content;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${scaleIn} 0.3s ease;

  svg {
    font-size: 0.875em;
  }

  &:hover {
    background: ${({ color }) => getColorWithOpacity(color, 0.25)};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ color }) => getColorWithOpacity(color, 0.3)};
  }

  @media (max-width: 1024px) {
    font-size: ${({ $variant }) =>
      $variant === "small" ? "0.7rem" : "0.825rem"};
  }

  @media (max-width: 768px) {
    font-size: ${({ $variant }) =>
      $variant === "small" ? "0.7rem" : "0.8rem"};
    padding: ${({ $variant }) =>
      $variant === "small" ? "0.2rem 0.4rem" : "0.3rem 0.6rem"};
  }

  @media (max-width: 480px) {
    font-size: ${({ $variant }) =>
      $variant === "small" ? "0.65rem" : "0.75rem"};
    padding: ${({ $variant }) =>
      $variant === "small" ? "0.15rem 0.35rem" : "0.25rem 0.5rem"};
  }
`;
