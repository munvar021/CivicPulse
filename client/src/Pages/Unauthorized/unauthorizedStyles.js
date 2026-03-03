import { theme } from "../../styles/theme";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: transparent;
  animation: fadeInUp 0.6s ease-out;

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

export const ContentCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  padding: 4rem 3rem;
  text-align: center;
  max-width: 600px;
  width: 100%;
  animation: fadeInUp 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
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

export const ErrorCode = styled.div`
  font-size: 6rem;
  color: #ef4444;
  margin: 0 0 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 4.5rem;
  }

  @media (max-width: 480px) {
    font-size: 3.5rem;
  }
`;

export const ErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  margin: 0 0 2.5rem 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HomeButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;
