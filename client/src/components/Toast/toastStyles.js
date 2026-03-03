import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { theme } from "../../styles/theme";

export const StyledToastContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    width: 360px;
    padding: 0;

    @media (max-width: 480px) {
      width: calc(100vw - 2rem);
      left: 1rem;
      right: 1rem;
    }
  }

  .Toastify__toast {
    background: ${theme.colors.glass.base};
    backdrop-filter: ${theme.liquidGlass.backdropFilter};
    -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
    border: ${theme.liquidGlass.border};
    border-radius: 1rem;
    box-shadow: ${theme.liquidGlass.boxShadow};
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
    font-family: inherit;
    font-size: 0.95rem;
    min-height: 64px;

    @media (max-width: 480px) {
      border-radius: 0.875rem;
      margin-bottom: 0.75rem;
    }
  }

  .Toastify__toast--success {
    border-left: 4px solid #10b981;
  }

  .Toastify__toast--error {
    border-left: 4px solid #ef4444;
  }

  .Toastify__toast--warning {
    border-left: 4px solid #f59e0b;
  }

  .Toastify__toast--info {
    border-left: 4px solid #3b82f6;
  }

  .Toastify__toast-body {
    padding: 0;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.6;
    font-weight: 500;
  }
`;
