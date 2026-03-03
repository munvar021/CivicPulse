import styled from "styled-components";
import { theme } from "../../styles/theme";

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 16px;
  animation: fadeInUp 0.6s ease-out 0.3s both;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

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

export const TableContainer = styled.div`
  min-width: 100%;
`;

export const StyledTable = styled.table`
  width: 100%;
  min-width: 900px;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  border-collapse: collapse;

  @media (max-width: 768px) {
    min-width: 700px;
  }
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  white-space: nowrap;
  width: ${({ width }) => width || "auto"};

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
`;

export const TableRow = styled.tr`
  transition: all 0.3s ease;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  color: ${theme.colors.text.secondary};
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
`;

export const NoData = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #9ca3af;
  font-size: 1rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
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

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    font-size: 0.9rem;
  }
`;
