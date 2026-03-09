import styled from "styled-components";
import { theme } from "../../styles/theme";
import { fadeInUp, scaleIn } from "../../styles/animations";

export const ContactContainer = styled.div`
  min-height: 100vh;
  background: ${theme.backgrounds.default};
  background-attachment: fixed;
  position: relative;
  overflow-x: hidden;
`;

export const Hero = styled.section`
  background: ${theme.backgrounds.deep};
  padding: 10rem 2rem 6rem;
  text-align: center;
  color: ${theme.colors.text.primary};
  position: relative;
  overflow: hidden;
  margin-top: 80px;

  &::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.18),
      transparent 65%
    );
    filter: blur(45px);
    pointer-events: none;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    padding: 8rem 1.5rem 4rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin: 0;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInUp : "none")} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text.primary};
  margin: 0 0 3rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: ${theme.liquidGlass.boxShadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    background: ${theme.liquidGlassHover.background};
  }
`;

export const InfoIcon = styled.div`
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  color: ${theme.colors.text.primary};
`;

export const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.75rem 0;
`;

export const InfoText = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0.25rem 0;
  font-size: 0.95rem;
`;

export const FormSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? scaleIn : "none")} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const Form = styled.form`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: ${theme.liquidGlass.boxShadow};

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  color: ${theme.colors.text.primary};
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: ${theme.colors.glass.muted};
  border: 1px solid
    ${({ $error }) =>
      $error ? theme.colors.status.error : "rgba(255, 255, 255, 0.1)"};
  border-radius: 12px;
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ $error }) =>
      $error ? theme.colors.status.error : "rgba(255, 255, 255, 0.3)"};
    background: ${theme.colors.glass.base};
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
    opacity: 0.6;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  background: ${theme.colors.glass.muted};
  border: 1px solid
    ${({ $error }) =>
      $error ? theme.colors.status.error : "rgba(255, 255, 255, 0.1)"};
  border-radius: 12px;
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ $error }) =>
      $error ? theme.colors.status.error : "rgba(255, 255, 255, 0.3)"};
    background: ${theme.colors.glass.base};
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  color: ${theme.colors.status.error};
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: ${theme.liquidGlassHover.background};
    transform: translateY(-2px);
    box-shadow: ${theme.liquidGlassHover.boxShadow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const MapSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;
