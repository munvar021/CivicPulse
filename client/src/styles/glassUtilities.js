import styled from "styled-components";
import { theme } from "./theme";

export const GlassPanel = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  box-shadow: ${theme.liquidGlass.boxShadow};
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${theme.liquidGlassHover.background};
    backdrop-filter: ${theme.liquidGlassHover.backdropFilter};
    -webkit-backdrop-filter: ${theme.liquidGlassHover.WebkitBackdropFilter};
    box-shadow: ${theme.liquidGlassHover.boxShadow};
    transform: translateY(-2px);
  }
`;

export const GlassCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  box-shadow: ${theme.liquidGlass.boxShadow};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const GlassButton = styled.button`
  background: ${theme.gradients.primary};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: ${theme.liquidGlass.border};
  color: ${theme.colors.text.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(79, 156, 249, 0.3);

  &:hover {
    background: linear-gradient(
      135deg,
      ${theme.colors.primary.light} 0%,
      ${theme.colors.primary.main} 100%
    );
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79, 156, 249, 0.5);
  }
`;

export const GlassInput = styled.input`
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: ${theme.colors.text.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:focus {
    background: ${theme.colors.glass.base};
    border-color: ${theme.colors.primary.main};
    box-shadow:
      0 0 0 3px rgba(79, 156, 249, 0.15),
      0 4px 12px rgba(79, 156, 249, 0.2);
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

export const GlassTextarea = styled.textarea`
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: ${theme.colors.text.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  resize: vertical;

  &:focus {
    background: ${theme.colors.glass.base};
    border-color: ${theme.colors.primary.main};
    box-shadow:
      0 0 0 3px rgba(79, 156, 249, 0.15),
      0 4px 12px rgba(79, 156, 249, 0.2);
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

export const StatusBadge = styled.span`
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: ${theme.liquidGlass.border};
  display: inline-block;

  ${(props) =>
    props.status === "resolved" &&
    `
    background: rgba(34, 197, 94, 0.15);
    color: ${theme.colors.status.success};
  `}

  ${(props) =>
    props.status === "progress" &&
    `
    background: rgba(246, 193, 119, 0.15);
    color: ${theme.colors.status.warning};
  `}

  ${(props) =>
    props.status === "assigned" &&
    `
    background: rgba(61, 214, 198, 0.15);
    color: ${theme.colors.secondary.main};
  `}

  ${(props) =>
    props.status === "escalated" &&
    `
    background: rgba(248, 113, 113, 0.15);
    color: ${theme.colors.status.danger};
  `}
`;
