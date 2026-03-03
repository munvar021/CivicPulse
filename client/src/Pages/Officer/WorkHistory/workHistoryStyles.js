import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../../../styles/theme";

export const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 140px 2rem 3rem 2rem;
  min-height: 100vh;
`;

export const PageTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 3rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${({ status }) => {
    switch (status) {
      case "completed":
        return "rgba(34, 197, 94, 0.2)";
      case "reassigned":
        return "rgba(239, 68, 68, 0.2)";
      default:
        return "rgba(59, 130, 246, 0.2)";
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "#22c55e";
      case "reassigned":
        return "#ef4444";
      default:
        return "#3b82f6";
    }
  }};
`;

export const ReassignmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

export const ViewButton = styled.button`
  padding: 0.5rem;
  background: ${theme.colors.glass.base};
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

export const TableSection = styled.div`
  margin-top: 2rem;
`;

export const CompactReassignmentInfo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

export const ErrorText = styled.p`
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;

export const StarIcon = styled(FontAwesomeIcon)`
  color: #fbbf24;
  margin-left: 0.25rem;
`;
