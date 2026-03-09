import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 2rem;
  padding-top: 140px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    padding-top: 120px;
    min-height: calc(100vh - 120px);
  }

  @media (max-width: 480px) {
    padding: 1rem;
    padding-top: 110px;
    min-height: calc(100vh - 110px);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 400px;
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease-out 0.1s both;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ReportSection = styled.div`
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out 0.4s both;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 0.75rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  padding: 2rem;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(102, 126, 234, 0.5);
    border-radius: 4px;
  }
`;

export const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(102, 126, 234, 0.1);
  border-bottom: 2px solid rgba(102, 126, 234, 0.3);
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
`;

export const TableRow = styled.tr`
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
`;
