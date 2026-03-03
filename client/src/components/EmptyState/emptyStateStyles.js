import styled from "styled-components";
import { fadeIn, fadeInUp } from "../../styles/animations";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ $variant }) =>
    $variant === "compact" ? "2rem 1rem" : "4rem 2rem"};
  text-align: center;
  animation:
    ${fadeIn} 0.6s ease,
    ${fadeInUp} 0.6s ease;
  min-height: ${({ $variant }) => ($variant === "fullpage" ? "60vh" : "auto")};

  @media (max-width: 1024px) {
    padding: ${({ $variant }) =>
      $variant === "compact" ? "1.75rem 1rem" : "3.5rem 1.75rem"};
  }

  @media (max-width: 768px) {
    padding: ${({ $variant }) =>
      $variant === "compact" ? "1.5rem 1rem" : "3rem 1.5rem"};
  }

  @media (max-width: 480px) {
    padding: ${({ $variant }) =>
      $variant === "compact" ? "1.25rem 0.75rem" : "2.5rem 1rem"};
  }
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  opacity: 0.6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  }

  @media (max-width: 1024px) {
    font-size: 3.5rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 1.375rem;
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  max-width: 400px;
  line-height: 1.6;
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 0.95rem;
    max-width: 380px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    max-width: 350px;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    max-width: 300px;
  }
`;

export const ActionWrapper = styled.div`
  margin-top: 1rem;
  animation: ${fadeIn} 0.8s ease 0.2s both;

  @media (max-width: 768px) {
    margin-top: 0.75rem;
  }
`;
