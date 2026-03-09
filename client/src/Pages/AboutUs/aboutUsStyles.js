import styled from "styled-components";
import { theme } from "../../styles/theme";
import { fadeInUp, fadeInLeft, fadeInRight } from "../../styles/animations";

export const AboutContainer = styled.div`
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

export const SectionText = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: ${theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
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
    box-shadow: ${theme.liquidGlassHover.boxShadow};
  }
`;

export const CardIcon = styled.div`
  font-size: 3rem;
  margin: 0 0 1rem 0;
  color: ${theme.colors.text.primary};
`;

export const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.75rem 0;
`;

export const CardText = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  text-align: center;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: ${theme.liquidGlass.boxShadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    background: ${theme.liquidGlassHover.background};
  }
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
`;

export const ValueCard = styled(Card)`
  animation: ${fadeInLeft} 0.8s ease-out;
`;

export const TimelineSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInRight : "none")} 0.8s
    ease-out;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 2rem;
  margin: 0 0 2rem 0;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 75px;
    top: 60px;
    width: 2px;
    height: calc(100% + 2rem);
    background: ${theme.liquidGlass.border};
  }

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr;
    gap: 1.5rem;

    &:not(:last-child)::after {
      left: 50px;
    }
  }
`;

export const TimelineYear = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  text-align: center;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 1rem;
  border-radius: 12px;
  height: fit-content;
`;

export const TimelineContent = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: ${theme.liquidGlass.boxShadow};
`;

export const TeamSection = styled.section`
  background: ${theme.backgrounds.raised};
  padding: 4rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;
