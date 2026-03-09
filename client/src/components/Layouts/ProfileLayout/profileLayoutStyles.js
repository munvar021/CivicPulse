import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 140px;
  background: transparent;
  min-height: 100vh;
  animation: fadeInUp 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 120px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    padding-top: 110px;
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

export const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease-out 0.2s both;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
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
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 2rem 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }
`;

export const ProfileSection = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
`;

export const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  align-items: center;

  @media (max-width: 480px) {
    grid-template-columns: 120px 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const InfoLabel = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export const InfoValue = styled.div`
  font-size: 1.0625rem;
  color: ${theme.colors.text.primary};
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9375rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
`;

export const HistorySection = styled.div`
  margin-top: 2rem;
  animation: fadeIn 0.6s ease-out 0.4s both;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const HistoryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  flex-wrap: wrap;

  button {
    flex: 1;
    min-width: 150px;

    @media (max-width: 768px) {
      flex: 1 1 calc(50% - 0.5rem);
      min-width: unset;
    }

    @media (max-width: 480px) {
      flex: 1 1 100%;
      min-width: 100%;
    }
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-top: 1.25rem;
    gap: 0.625rem;
  }
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 0.9375rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    font-size: 0.875rem;
  }
`;
