import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: ${(props) => (props.$noMargin ? "0" : "2rem")};
  align-items: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    gap: 0.75rem;
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

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 220px;
  flex: 1;
  max-width: 280px;

  > div {
    flex: 1;
    min-width: 180px;
  }

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

export const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  min-width: fit-content;
`;
