import { theme } from "../../../styles/theme";
import styled from "styled-components";

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

export const MapSection = styled.div`
  margin-bottom: 3rem;
  border-radius: 16px;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
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

export const Table = styled.table`
  width: 100%;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out 0.3s both;

  @media (max-width: 1024px) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
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

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  border-bottom: ${theme.liquidGlass.border};
  background: rgba(255, 255, 255, 0.02);
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
`;

export const TableRow = styled.tr`
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  &:not(:last-child) td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  color: ${theme.colors.text.secondary};
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1024px) {
    max-width: 150px;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
    max-width: 120px;
  }
`;

export const PriorityBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  text-transform: capitalize;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  text-transform: capitalize;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
`;

export const NoData = styled.p`
  text-align: center;
  padding: 3rem 2rem;
  color: #9ca3af;
  font-size: 1rem;
  animation: fadeInUp 0.6s ease-out 0.3s both;

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

export const ErrorText = styled.p`
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;
