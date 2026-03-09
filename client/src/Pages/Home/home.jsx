import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faLock,
  faMobileAlt,
  faGlobe,
  faLightbulb,
  faRoad,
  faTrash,
  faTint,
  faTree,
  faExclamationTriangle,
  faUser,
  faUserShield,
  faUserTie,
  faStar,
  faEnvelope,
  faPhone,
  faMapMarked,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Headers/header";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { featuresData } from "../../Data/homeData";
import {
  HomeContainer,
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  Features,
  SectionTitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  Stats,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  Benefits,
  BenefitsGrid,
  BenefitCard,
  BenefitIcon,
  BenefitTitle,
  BenefitText,
  Categories,
  CategoryGrid,
  CategoryCard,
  CategoryIcon,
  CategoryName,
  SuccessStories,
  StoriesGrid,
  StoryCard,
  StoryImage,
  StoryContent,
  StoryTitle,
  StoryDescription,
  StoryBadge,
  Testimonials,
  TestimonialGrid,
  TestimonialCard,
  TestimonialText,
  TestimonialAuthor,
  TestimonialRating,
  UserTypes,
  UserTypesGrid,
  UserTypeCard,
  UserTypeIcon,
  UserTypeTitle,
  UserTypeDescription,
  FAQ,
  FAQGrid,
  FAQItem,
  FAQQuestion,
  FAQAnswer,
  CTA,
  CTATitle,
  CTAText,
  Footer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  Copyright,
} from "./homeStyles";

const Home = () => {
  const navigate = useNavigate();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [benefitsRef, benefitsVisible] = useScrollAnimation();
  const [categoriesRef, categoriesVisible] = useScrollAnimation();
  const [storiesRef, storiesVisible] = useScrollAnimation();
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation();
  const [userTypesRef, userTypesVisible] = useScrollAnimation();
  const [faqRef, faqVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Login" },
  ];

  return (
    <HomeContainer>
      <Header navItems={navItems} />

      <Hero>
        <HeroContent>
          <HeroTitle>Report. Track. Resolve.</HeroTitle>
          <HeroSubtitle>
            Your civic issues matter. Join thousands making their neighborhoods
            better every day.
          </HeroSubtitle>
          <ButtonGroup>
            <PrimaryButton onClick={() => navigate("/citizen/register")}>
              Get Started Free
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/login")}>
              Login
            </SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </Hero>

      <Features ref={featuresRef} $visible={featuresVisible}>
        <SectionTitle>How It Works</SectionTitle>
        <FeatureGrid>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>
                <FontAwesomeIcon icon={feature.icon} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureText>{feature.text}</FeatureText>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Features>

      <Stats ref={statsRef} $visible={statsVisible}>
        <SectionTitle>Making a Difference</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatValue>2,456</StatValue>
            <StatLabel>Issues Reported</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>1,823</StatValue>
            <StatLabel>Issues Resolved</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>8</StatValue>
            <StatLabel>Active Zones</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>74%</StatValue>
            <StatLabel>Resolution Rate</StatLabel>
          </StatCard>
        </StatsGrid>
      </Stats>

      <Benefits ref={benefitsRef} $visible={benefitsVisible}>
        <SectionTitle>Why Choose CivicPulse?</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>
              <FontAwesomeIcon icon={faBolt} />
            </BenefitIcon>
            <BenefitTitle>Fast Response Times</BenefitTitle>
            <BenefitText>
              Average resolution time of 3.2 days with real-time updates
            </BenefitText>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>
              <FontAwesomeIcon icon={faLock} />
            </BenefitIcon>
            <BenefitTitle>Secure & Transparent</BenefitTitle>
            <BenefitText>
              Your data is protected and all actions are tracked for
              accountability
            </BenefitText>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>
              <FontAwesomeIcon icon={faMobileAlt} />
            </BenefitIcon>
            <BenefitTitle>Easy to Use</BenefitTitle>
            <BenefitText>
              Intuitive interface designed for citizens of all technical levels
            </BenefitText>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>
              <FontAwesomeIcon icon={faGlobe} />
            </BenefitIcon>
            <BenefitTitle>Community Impact</BenefitTitle>
            <BenefitText>
              Join thousands making their neighborhoods better every day
            </BenefitText>
          </BenefitCard>
        </BenefitsGrid>
      </Benefits>

      <Categories ref={categoriesRef} $visible={categoriesVisible}>
        <SectionTitle>Common Issue Categories</SectionTitle>
        <CategoryGrid>
          <CategoryCard>
            <CategoryIcon>
              <FontAwesomeIcon icon={faLightbulb} />
            </CategoryIcon>
            <CategoryName>Street Lights</CategoryName>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <FontAwesomeIcon icon={faRoad} />
            </CategoryIcon>
            <CategoryName>Road Issues</CategoryName>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <FontAwesomeIcon icon={faTrash} />
            </CategoryIcon>
            <CategoryName>Sanitation</CategoryName>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <FontAwesomeIcon icon={faTint} />
            </CategoryIcon>
            <CategoryName>Water Issues</CategoryName>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <FontAwesomeIcon icon={faTree} />
            </CategoryIcon>
            <CategoryName>Parks</CategoryName>
          </CategoryCard>
          <CategoryCard>
            <CategoryIcon>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </CategoryIcon>
            <CategoryName>Safety</CategoryName>
          </CategoryCard>
        </CategoryGrid>
      </Categories>

      <SuccessStories ref={storiesRef} $visible={storiesVisible}>
        <SectionTitle>Recent Success Stories</SectionTitle>
        <StoriesGrid>
          <StoryCard>
            <StoryImage>
              <FontAwesomeIcon icon={faRoad} />
            </StoryImage>
            <StoryContent>
              <StoryBadge>Resolved in 2 days</StoryBadge>
              <StoryTitle>Pothole on Main Street</StoryTitle>
              <StoryDescription>
                Reported by Sarah M. - Fixed quickly by the road maintenance
                team
              </StoryDescription>
            </StoryContent>
          </StoryCard>
          <StoryCard>
            <StoryImage>
              <FontAwesomeIcon icon={faLightbulb} />
            </StoryImage>
            <StoryContent>
              <StoryBadge>Resolved in 1 day</StoryBadge>
              <StoryTitle>Broken Street Light</StoryTitle>
              <StoryDescription>
                Reported by John D. - Electricity department responded
                immediately
              </StoryDescription>
            </StoryContent>
          </StoryCard>
          <StoryCard>
            <StoryImage>
              <FontAwesomeIcon icon={faTrash} />
            </StoryImage>
            <StoryContent>
              <StoryBadge>Resolved in 3 days</StoryBadge>
              <StoryTitle>Garbage Collection Issue</StoryTitle>
              <StoryDescription>
                Reported by Maria L. - Sanitation team resolved the recurring
                problem
              </StoryDescription>
            </StoryContent>
          </StoryCard>
        </StoriesGrid>
      </SuccessStories>

      <Testimonials ref={testimonialsRef} $visible={testimonialsVisible}>
        <SectionTitle>What Our Community Says</SectionTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialRating>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </TestimonialRating>
            <TestimonialText>
              "CivicPulse made it so easy to report the broken streetlight on my
              block. It was fixed within 48 hours!"
            </TestimonialText>
            <TestimonialAuthor>
              - Sarah Martinez, Downtown Resident
            </TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialRating>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </TestimonialRating>
            <TestimonialText>
              "The officer portal helps me manage my tasks efficiently. I can
              update citizens in real-time about progress."
            </TestimonialText>
            <TestimonialAuthor>- Mike Johnson, Field Officer</TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialRating>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </TestimonialRating>
            <TestimonialText>
              "The admin dashboard gives me complete visibility into our
              department's performance and citizen satisfaction."
            </TestimonialText>
            <TestimonialAuthor>
              - Lisa Anderson, Department Admin
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </Testimonials>

      <UserTypes ref={userTypesRef} $visible={userTypesVisible}>
        <SectionTitle>For Everyone in the Community</SectionTitle>
        <UserTypesGrid>
          <UserTypeCard>
            <UserTypeIcon>
              <FontAwesomeIcon icon={faUser} />
            </UserTypeIcon>
            <UserTypeTitle>Citizens</UserTypeTitle>
            <UserTypeDescription>
              Report issues, track progress, and provide feedback
            </UserTypeDescription>
          </UserTypeCard>
          <UserTypeCard>
            <UserTypeIcon>
              <FontAwesomeIcon icon={faUserShield} />
            </UserTypeIcon>
            <UserTypeTitle>Field Officers</UserTypeTitle>
            <UserTypeDescription>
              Manage tasks, update progress, and resolve issues
            </UserTypeDescription>
          </UserTypeCard>
          <UserTypeCard>
            <UserTypeIcon>
              <FontAwesomeIcon icon={faUserTie} />
            </UserTypeIcon>
            <UserTypeTitle>Department Admins</UserTypeTitle>
            <UserTypeDescription>
              Assign tasks, monitor performance, and generate reports
            </UserTypeDescription>
          </UserTypeCard>
          <UserTypeCard>
            <UserTypeIcon>
              <FontAwesomeIcon icon={faBolt} />
            </UserTypeIcon>
            <UserTypeTitle>Super Admins</UserTypeTitle>
            <UserTypeDescription>
              System oversight, user management, and analytics
            </UserTypeDescription>
          </UserTypeCard>
        </UserTypesGrid>
      </UserTypes>

      <FAQ ref={faqRef} $visible={faqVisible}>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQGrid>
          <FAQItem>
            <FAQQuestion>
              How long does it take to resolve an issue?
            </FAQQuestion>
            <FAQAnswer>
              Resolution times vary by issue type and priority. On average,
              high-priority issues are resolved within 24-48 hours, while
              standard issues take 3-5 days.
            </FAQAnswer>
          </FAQItem>
          <FAQItem>
            <FAQQuestion>Can I track the progress of my complaint?</FAQQuestion>
            <FAQAnswer>
              Yes! Once you report an issue, you'll receive real-time updates as
              field officers work on your complaint. You can also log in to
              check the status anytime.
            </FAQAnswer>
          </FAQItem>
          <FAQItem>
            <FAQQuestion>Is there a cost to use CivicPulse?</FAQQuestion>
            <FAQAnswer>
              CivicPulse is completely free for citizens. It's funded by your
              local government to improve community services and civic
              engagement.
            </FAQAnswer>
          </FAQItem>
          <FAQItem>
            <FAQQuestion>What types of issues can I report?</FAQQuestion>
            <FAQAnswer>
              You can report various civic issues including street lights, road
              problems, sanitation issues, water problems, park maintenance, and
              safety concerns.
            </FAQAnswer>
          </FAQItem>
        </FAQGrid>
      </FAQ>

      <CTA ref={ctaRef} $visible={ctaVisible}>
        <CTATitle>Ready to Make Your Community Better?</CTATitle>
        <CTAText>
          Join thousands of citizens working together to improve their
          neighborhoods
        </CTAText>
        <PrimaryButton onClick={() => navigate("/citizen/register")}>
          Start Reporting Issues
        </PrimaryButton>
      </CTA>

      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>CivicPulse</FooterTitle>
            <p>
              Connecting communities with local government for better civic
              engagement and issue resolution.
            </p>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinks>
              <FooterLink onClick={() => navigate("/citizen/register")}>
                Register as Citizen
              </FooterLink>
              <FooterLink onClick={() => navigate("/login")}>Login</FooterLink>
              <FooterLink onClick={() => navigate("/about")}>
                About Us
              </FooterLink>
              <FooterLink onClick={() => navigate("/contact")}>
                Contact
              </FooterLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Contact Info</FooterTitle>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> support@civicpulse.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarked} /> City Hall, Main Street
            </p>
          </FooterSection>
        </FooterContent>
        <Copyright>&copy; 2024 CivicPulse. All rights reserved.</Copyright>
      </Footer>
    </HomeContainer>
  );
};

export default Home;
