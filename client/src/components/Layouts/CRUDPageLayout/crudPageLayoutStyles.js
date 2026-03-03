import styled from "styled-components";

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease-out 0.2s both;

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
`;

export const ActionButton = styled.button`
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const DeleteActionButton = styled(ActionButton)`
  background: #ef4444;
  border-color: #ef4444;

  &:hover {
    background: #dc2626;
  }
`;
