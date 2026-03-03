import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 140px 2rem 3rem 2rem;
  background: transparent;
  min-height: 100vh;
  animation: fadeInUp 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 120px 1.5rem 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 110px 1rem 1.5rem 1rem;
  }

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
`;

export const PageTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out 0.1s both;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

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
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;
