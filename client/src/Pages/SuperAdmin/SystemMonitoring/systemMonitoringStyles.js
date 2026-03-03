import { theme } from "../../../styles/theme";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 140px 2rem 3rem 2rem;
  background: transparent;
  min-height: 100vh;
  animation: fadeInUp 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 120px 1.5rem 2.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 110px 1rem 2rem 1rem;
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

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out 0.2s both;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
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

export const Section = styled.section`
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
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

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.35rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

export const MetricCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: ${theme.liquidGlass.boxShadow};
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.liquidGlassHover.boxShadow};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 12px;
  }
`;

export const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const MetricValue = styled.div``;

export const ChartPlaceholder = styled.div`
  padding: 3rem;
  text-align: center;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};

  @media (max-width: 768px) {
    padding: 2.5rem;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 2rem;
    border-radius: 12px;
  }
`;

export const UptimeIcon = styled(FontAwesomeIcon)`
  color: #10b981;
`;

export const ChartSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
`;

export const ChartTitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #fff;
`;
