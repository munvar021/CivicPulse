import styled from "styled-components";
import { Link } from "react-router-dom";
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
`;

export const FormCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: ${theme.liquidGlass.boxShadow};
  width: 100%;
  max-width: 400px;
  animation: ${scaleIn} 0.6s ease-out;
  position: relative;
  z-index: 1;

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

export const Input = styled.input`
  padding: 0.75rem;
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
`;

export const Button = styled.button`
  padding: 0.75rem;
  background: ${(props) => props.color || theme.colors.glass.base};
  backdrop-filter: blur(20px);
  border: ${theme.liquidGlass.border};
  color: ${theme.colors.text.primary};
  border-radius: 12px;
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
`;

export const LinkText = styled.p`
  text-align: center;
  color: ${theme.colors.text.secondary};
  margin-top: 1rem;
  font-size: 0.9rem;
  animation: ${fadeInUp} 0.6s ease-out 0.4s both;
`;

export const StyledLink = styled(Link)`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Card = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: ${theme.liquidGlass.boxShadow};
  width: 100%;
  max-width: 900px;
  position: relative;
  z-index: 1;
  animation: ${scaleIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${theme.colors.text.secondary};
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.6;
  animation: ${fadeInDown} 0.6s ease-out 0.2s both;
`;

export const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  animation: ${fadeInUp} 0.6s ease-out 0.3s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const RoleCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(10px);
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  text-decoration: none;
  color: ${theme.colors.text.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(255, 255, 255, 0.1);
  }
`;

export const RoleIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
`;

export const RoleTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const RoleDescription = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

export const BackLink = styled(Link)`
  display: block;
  text-align: center;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  margin-top: 1.5rem;
  transition: color 0.2s;
  animation: ${fadeInUp} 0.6s ease-out 0.5s both;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const ErrorMessage = styled.span`
  color: ${theme.colors.status.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const PasswordInput = styled(Input)`
  padding-right: 3rem;
  width: 100%;
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

export const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid ${theme.colors.text.primary};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 0.5rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
