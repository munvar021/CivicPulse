import { theme } from "../../../styles/theme";
import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 140px;
  background: transparent;
  min-height: 100vh;
  animation: fadeInUp 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    padding-top: 120px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
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

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 1rem;
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
    transform: translateX(-4px);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

export const DetailsCard = styled.div`
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease-out 0.1s both;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
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

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
`;

export const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 90px 1fr;
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 80px 1fr;
    gap: 0.75rem;
  }
`;

export const Label = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const Value = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text.primary};
  font-weight: 500;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Section = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  &:first-of-type {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

export const ActionButton = styled.button`
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    background: rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const ErrorText = styled.p`
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;

export const EmptyText = styled.p`
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
`;

export const AssignButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export const TitleWithMargin = styled(Title)`
  margin-bottom: 1rem;
`;

export const AssignmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const AssignmentActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ReassignButton = styled(ActionButton)`
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  background: rgba(245, 158, 11, 0.2);
  border-color: rgba(245, 158, 11, 0.3);
  color: #f59e0b;
`;

export const EditButton = styled(ActionButton)`
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
`;

export const ActionsSection = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const CompleteButton = styled(ActionButton)`
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(16, 185, 129, 0.3);
  color: #10b981;

  &:hover {
    background: rgba(16, 185, 129, 0.3);
  }
`;
