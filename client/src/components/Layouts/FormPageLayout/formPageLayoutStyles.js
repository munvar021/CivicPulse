import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 140px 2rem 3rem 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 120px 1.5rem 2.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 110px 1rem 2rem 1rem;
  }
`;

export const BackButton = styled.button`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 0.5rem;
  color: ${theme.colors.text.primary};
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${theme.liquidGlassHover.background};
    transform: translateX(-4px);
  }
`;

export const FormCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: ${theme.liquidGlass.boxShadow};

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
`;
