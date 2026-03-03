import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { liquidGlassEffect } from "./liquidGlass";

export const GlobalStyles = createGlobalStyle`
  :root {
    --light-intensity: 0.08;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    background: ${theme.colors.background.base};
    overflow-x: hidden;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
    background: ${theme.backgrounds.default};
    background-attachment: fixed;
    min-height: 100vh;
    color: ${theme.colors.text.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background 0.2s linear;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    background: ${theme.backgrounds.default};
    background-attachment: fixed;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.ambient};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .Toastify__toast-container {
  }

  .Toastify__toast {
    ${liquidGlassEffect}
    background: ${theme.liquidGlass.background}; 
    border: ${theme.liquidGlass.border};
    backdrop-filter: ${theme.liquidGlass.backdropFilter};
    -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
    box-shadow: ${theme.liquidGlass.boxShadow};
    color: ${theme.colors.text.primary};
    padding: 1rem;
    border-radius: 16px;
    font-family: inherit;
    font-size: 0.9rem;
    line-height: 1.4;
    min-height: unset;

    &.Toastify__toast--success {
      background: linear-gradient(
          135deg,
          ${theme.colors.status.success},
          ${theme.liquidGlass.background}
      );
    }

    &.Toastify__toast--error {
      background: linear-gradient(
          135deg,
          ${theme.colors.status.danger},
          ${theme.liquidGlass.background}
      );
    }

    &.Toastify__toast--info {
      background: linear-gradient(
          135deg,
          ${theme.colors.primary.main},
          ${theme.liquidGlass.background}
      );
    }

    &.Toastify__toast--warning {
      background: linear-gradient(
          135deg,
          ${theme.colors.status.warning},
          ${theme.liquidGlass.background}
      );
    }
  }

  .Toastify__toast-body {
    color: ${theme.colors.text.primary};
  }
`;
