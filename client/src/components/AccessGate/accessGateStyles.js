import styled from "styled-components";
import { theme } from "../../styles/theme";
import { fadeInUp, scaleIn, fadeInDown } from "../../styles/animations";

export const Container = styled.div`
  min-height: 100vh;
  background: ${theme.backgrounds.default};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.18),
      transparent 65%
    );
    filter: blur(45px);
    pointer-events: none;
    top: 8%;
    left: 10%;
  }

  &::after {
    content: "";
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.18),
      transparent 65%
    );
    filter: blur(45px);
    pointer-events: none;
    bottom: 15%;
    right: 12%;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Card = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: ${theme.liquidGlass.boxShadow};
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
  animation: ${scaleIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.75rem;
  animation: ${fadeInDown} 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: ${fadeInDown} 0.6s ease-out 0.2s both;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeInUp} 0.6s ease-out 0.3s both;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-right: 3rem;
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(10px);
  border: ${(props) =>
    props.$error
      ? "1px solid rgba(239, 68, 68, 0.5)"
      : theme.liquidGlass.border};
  border-radius: 10px;
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;

  &:focus {
    background: ${theme.colors.glass.base};
    border-color: ${(props) =>
      props.$error ? "rgba(239, 68, 68, 0.7)" : "rgba(255, 255, 255, 0.3)"};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$error ? "rgba(239, 68, 68, 0.1)" : "rgba(255, 255, 255, 0.1)"};
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    padding-right: 3rem;
    font-size: 1rem;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 2;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const ErrorMessage = styled.span`
  color: ${theme.colors.status.danger};
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  border: ${theme.liquidGlass.border};
  color: ${theme.colors.text.primary};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const BackLink = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background: transparent;
  color: ${theme.colors.text.secondary};
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  animation: ${fadeInUp} 0.6s ease-out 0.4s both;

  &:hover {
    color: ${theme.colors.text.primary};
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;
