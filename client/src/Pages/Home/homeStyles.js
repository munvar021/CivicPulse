import styled from "styled-components";
import { theme } from "../../styles/theme";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  float,
} from "../../styles/animations";

export const HomeContainer = styled.div`
  min-height: 100vh;
  background: ${theme.backgrounds.default};
  background-attachment: fixed;
  position: relative;
  overflow-x: hidden;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border-bottom: ${theme.liquidGlass.border};
  box-shadow: ${theme.liquidGlass.boxShadow};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavBrand = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.text.primary};
  }
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
  margin: 0 0 2rem 0;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

  &:hover {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 255, 255, 0.1);
  }
`;

export const SecondaryButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(10px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

export const Features = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInUp : "none")} 0.8s ease-out;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: ${theme.colors.text.primary};
  margin-bottom: 3rem;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

export const FeatureCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
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
    animation: ${float} 3s ease-in-out infinite;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

export const FeatureText = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

export const Stats = styled.section`
  background: ${theme.backgrounds.raised};
  backdrop-filter: blur(20px);
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? scaleIn : "none")} 0.8s ease-out;
`;

export const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

export const StatCard = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
`;

export const Categories = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInUp : "none")} 0.8s ease-out;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
`;

export const CategoryCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: ${theme.liquidGlass.boxShadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    background: ${theme.liquidGlassHover.background};
    box-shadow: ${theme.liquidGlassHover.boxShadow};
  }
`;

export const CategoryIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

export const CategoryName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const Testimonials = styled.section`
  background: transparent;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInLeft : "none")} 0.8s ease-out;
`;

export const TestimonialGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const TestimonialCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: ${theme.liquidGlass.boxShadow};
`;

export const TestimonialText = styled.p`
  color: ${theme.colors.text.secondary};
  font-style: italic;
  margin: 0 0 1rem 0;
  line-height: 1.6;
`;

export const TestimonialAuthor = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 600;
`;

export const CTA = styled.section`
  background: ${theme.backgrounds.deep};
  padding: 4rem 2rem;
  text-align: center;
  color: ${theme.colors.text.primary};
  position: relative;
  overflow: hidden;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? scaleIn : "none")} 0.8s ease-out;

  &::before {
    content: "";
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15),
      transparent 65%
    );
    filter: blur(45px);
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  position: relative;
  z-index: 1;
`;

export const CTAText = styled.p`
  font-size: 1.2rem;
  margin: 0 0 2rem 0;
  opacity: 0.72;
  position: relative;
  z-index: 1;
`;

export const Footer = styled.footer`
  background: ${theme.colors.background.base};
  color: white;
  padding: 3rem 2rem 1rem;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const FooterSection = styled.div`
  p {
    color: #9ca3af;
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
`;

export const FooterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: white;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #374151;
  color: #9ca3af;
  font-size: 0.9rem;
`;

export const Benefits = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  background: transparent;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInRight : "none")} 0.8s
    ease-out;
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const BenefitCard = styled.div`
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

export const BenefitIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const BenefitTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

export const BenefitText = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

export const SuccessStories = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInUp : "none")} 0.8s ease-out;
`;

export const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const StoryCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.liquidGlass.boxShadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    background: ${theme.liquidGlassHover.background};
  }
`;

export const StoryImage = styled.div`
  background: ${theme.backgrounds.raised};
  padding: 3rem;
  text-align: center;
  font-size: 4rem;
`;

export const StoryContent = styled.div`
  padding: 1.5rem;
`;

export const StoryBadge = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(34, 197, 94, 0.15);
  color: ${theme.colors.status.success};
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

export const StoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

export const StoryDescription = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
  font-size: 0.95rem;
`;

export const TestimonialRating = styled.div`
  color: #fbbf24;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const UserTypes = styled.section`
  background: transparent;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInLeft : "none")} 0.8s ease-out;
`;

export const UserTypesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

export const UserTypeCard = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: ${theme.liquidGlass.boxShadow};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    background: ${theme.liquidGlassHover.background};
  }
`;

export const UserTypeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const UserTypeTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
`;

export const UserTypeDescription = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
  font-size: 0.95rem;
`;

export const FAQ = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  animation: ${({ $visible }) => ($visible ? fadeInRight : "none")} 0.8s
    ease-out;
`;

export const FAQGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FAQItem = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  border: ${theme.liquidGlass.border};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: ${theme.liquidGlass.boxShadow};
`;

export const FAQQuestion = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 0.75rem 0;
`;

export const FAQAnswer = styled.p`
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;
