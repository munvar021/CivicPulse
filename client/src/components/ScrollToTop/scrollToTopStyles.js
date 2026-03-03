import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 50%;
  box-shadow: ${theme.liquidGlass.boxShadow};
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  cursor: pointer;
  opacity: ${({ $visible }) => ($visible ? "1" : "0")};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(20px)"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.liquidGlassHover.background};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px);
    box-shadow: ${theme.liquidGlassHover.boxShadow};
  }

  &:active {
    transform: translateY(-2px);
  }
`;
