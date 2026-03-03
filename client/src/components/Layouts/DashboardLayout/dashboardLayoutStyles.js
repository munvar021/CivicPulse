import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.backgrounds.default};
  background-attachment: fixed;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 140px 2rem 3rem 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 120px 1.5rem 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 110px 1rem 1.5rem 1rem;
  }
`;

export const WelcomeSection = styled.section`
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out;

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

export const WelcomeTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.75rem 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const QuickActionsSection = styled.section`
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out 0.1s both;

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

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.75rem;

    @media (max-width: 768px) {
      padding: 1.5rem;
      gap: 1rem;
    }

    @media (max-width: 480px) {
      padding: 1.25rem;
    }

    p {
      flex: 1;
      margin: 0 0 0.5rem 0;
      line-height: 1.6;
      color: ${theme.colors.text.secondary};
    }

    button {
      margin-top: 0.75rem;
      align-self: flex-end;
      min-width: 150px;

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;

export const StatsSection = styled.section`
  margin-bottom: 3rem;
  animation: fadeInUp 0.6s ease-out 0.2s both;

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
  font-size: 1.625rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 1.75rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.375rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.75rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

export const RecentSection = styled.section`
  margin-top: 3rem;
  animation: fadeInUp 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    margin-top: 2.5rem;
  }

  @media (max-width: 480px) {
    margin-top: 2rem;
  }

  & > button {
    margin-left: auto;
    display: block;
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

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.875rem;
    margin-bottom: 1.25rem;
  }
`;

export const ItemCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: ${theme.liquidGlass.boxShadow};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 14px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    background: ${theme.liquidGlassHover.background};
    box-shadow: ${theme.liquidGlassHover.boxShadow};
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1.25rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 0.875rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

export const ItemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.0625rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ItemMeta = styled.div`
  font-size: 0.9375rem;
  color: ${theme.colors.text.secondary};
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
    gap: 0.75rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  padding: 2rem;
  text-align: center;
`;

export const BadgeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
