import styled from "styled-components";
import { theme } from "../../styles/theme";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $scrolled }) => ($scrolled ? "0.6rem 2rem" : "1rem 2rem")};
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  position: fixed;
  top: 12px;
  left: 12px;
  right: 12px;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? "0 8px 32px rgba(0, 0, 0, 0.12)"
      : "0 4px 16px rgba(0, 0, 0, 0.06)"};
  border: ${theme.liquidGlass.border};
  border-radius: 24px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2) 50%,
      transparent
    );
    border-radius: 24px 24px 0 0;
    opacity: ${({ $scrolled }) => ($scrolled ? 0.8 : 0.4)};
    transition: opacity 0.4s ease;
  }

  @media (max-width: 768px) {
    padding: ${({ $scrolled }) => ($scrolled ? "0.5rem 1rem" : "0.8rem 1rem")};
    left: 8px;
    right: 8px;
    top: 8px;
    border-radius: 20px;
  }
`;

export const Logo = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;
  user-select: none;
  display: flex;
  align-items: center;

  img {
    height: 50px;
    width: 50px;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    img {
      height: 40px;
      width: 40px;
    }
  }
`;

export const Nav = styled.nav`
  display: ${({ $desktop }) => ($desktop ? "flex" : "flex")};
  gap: 2rem;

  @media (max-width: 1024px) {
    display: ${({ $desktop }) => ($desktop ? "none" : "flex")};
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }
`;

export const NavItem = styled.button`
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border: ${({ $active }) =>
    $active ? "0.5px solid rgba(255, 255, 255, 0.2)" : "none"};
  color: ${({ $active }) =>
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;

  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    border-radius: 16px;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding: 0;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: calc(8px + 60px);
  left: 8px;
  right: 8px;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(80px) saturate(220%);
  -webkit-backdrop-filter: blur(80px) saturate(220%);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: ${({ $open }) =>
    $open ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.95)"};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  z-index: 999;
  border-radius: 20px;
  border: ${theme.liquidGlass.border};
  max-height: ${({ $open }) => ($open ? "80vh" : "0")};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2) 50%,
      transparent
    );
    border-radius: 20px 20px 0 0;
  }

  @media (min-width: 1025px) {
    display: none;
  }
`;
