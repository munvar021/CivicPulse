import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Headers/header";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import {
  missionVisionData,
  coreValuesData,
  impactStatsData,
  journeyData,
  whyMattersData,
} from "../../Data/aboutUsData";
import {
  AboutContainer,
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionTitle,
  SectionText,
  Grid,
  Card,
  CardIcon,
  CardTitle,
  CardText,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  TeamSection,
  ValueCard,
  TimelineSection,
  TimelineItem,
  TimelineYear,
  TimelineContent,
} from "./aboutUsStyles";

const AboutUs = () => {
  const [missionRef, missionVisible] = useScrollAnimation();
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [timelineRef, timelineVisible] = useScrollAnimation();
  const [impactRef, impactVisible] = useScrollAnimation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Login" },
  ];

  return (
    <AboutContainer>
      <Header navItems={navItems} />

      <Hero>
        <HeroContent>
          <HeroTitle>About CivicPulse</HeroTitle>
          <HeroSubtitle>
            Empowering citizens, streamlining governance, building better communities
          </HeroSubtitle>
        </HeroContent>
      </Hero>

      <Section ref={missionRef} $visible={missionVisible}>
        <SectionTitle>Our Mission & Vision</SectionTitle>
        <Grid>
          {missionVisionData.map((item, index) => (
            <Card key={index}>
              <CardIcon>
                <FontAwesomeIcon icon={item.icon} />
              </CardIcon>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section ref={valuesRef} $visible={valuesVisible}>
        <SectionTitle>Our Core Values</SectionTitle>
        <Grid>
          {coreValuesData.map((item, index) => (
            <ValueCard key={index}>
              <CardIcon>
                <FontAwesomeIcon icon={item.icon} />
              </CardIcon>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </ValueCard>
          ))}
        </Grid>
      </Section>

      <Section ref={statsRef} $visible={statsVisible}>
        <SectionTitle>Our Impact</SectionTitle>
        <StatsGrid>
          {impactStatsData.map((stat, index) => (
            <StatCard key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Section>

      <TimelineSection ref={timelineRef} $visible={timelineVisible}>
        <SectionTitle>Our Journey</SectionTitle>
        {journeyData.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineYear>{item.year}</TimelineYear>
            <TimelineContent>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineSection>

      <Section ref={impactRef} $visible={impactVisible}>
        <SectionTitle>Why CivicPulse Matters</SectionTitle>
        <Grid>
          {whyMattersData.map((item, index) => (
            <Card key={index}>
              <CardIcon>
                <FontAwesomeIcon icon={item.icon} />
              </CardIcon>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Section>

      <TeamSection>
        <SectionTitle>Join Our Mission</SectionTitle>
        <SectionText>
          Whether you're a citizen looking to improve your neighborhood, an officer dedicated
          to serving your community, or an administrator committed to efficient governance,
          CivicPulse provides the tools you need to make a real difference.
        </SectionText>
      </TeamSection>
    </AboutContainer>
  );
};

export default AboutUs;
