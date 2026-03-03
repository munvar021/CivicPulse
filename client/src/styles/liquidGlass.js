import { css } from "styled-components";

export const glassEffect = css`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 16px;
  border: 0.5px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const liquidGlassEffect = css`
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  backdrop-filter: blur(60px) saturate(200%) brightness(110%);
  -webkit-backdrop-filter: blur(60px) saturate(200%) brightness(110%);
  border-radius: 24px;
  border: none;
  box-shadow: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(0, 0, 0, 0.05) 100%
    );
    pointer-events: none;
    opacity: 0.6;
  }

  &::after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: 24px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.05)
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const liquidGlassHover = css`
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const glassCardStyles = css`
  ${glassEffect}
  padding: 1.5rem;
  ${liquidGlassHover}
`;

export const liquidGlassCardStyles = css`
  ${liquidGlassEffect}
  padding: 1.5rem;
`;

export const glassButtonStyles = css`
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 16px rgba(37, 99, 235, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  &:hover {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    transform: translateY(-2px);
    box-shadow:
      0 8px 24px rgba(37, 99, 235, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
`;

export const glassInputStyles = css`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: #1e293b;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &:focus {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0.7) 100%
    );
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow:
      0 0 0 3px rgba(59, 130, 246, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const colors = {
  primary: "#2563eb",
  primaryLight: "#3b82f6",
  primaryDark: "#1e40af",

  secondary: "#0d9488",
  secondaryLight: "#14b8a6",
  secondaryDark: "#0f766e",

  success: "#10b981",
  successLight: "#34d399",
  warning: "#f59e0b",
  warningLight: "#fbbf24",
  danger: "#e11d48",
  dangerLight: "#f43f5e",
  info: "#0ea5e9",
  infoLight: "#38bdf8",

  violet: "#8b5cf6",
  purple: "#a855f7",
  indigo: "#6366f1",

  textPrimary: "#0f172a",
  textSecondary: "#475569",
  textLight: "#94a3b8",
};
