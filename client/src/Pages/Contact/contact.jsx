import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Header from "../../components/Headers/header";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { contactInfoData, findUsCoordinates } from "../../Data/contactData";
import {
  ContactContainer,
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionTitle,
  Grid,
  InfoCard,
  InfoIcon,
  InfoTitle,
  InfoText,
  FormSection,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ErrorMessage,
  SubmitButton,
  MapSection,
} from "./contactStyles";

const Contact = () => {
  const [infoRef, infoVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/login", label: "Login" },
  ];

  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(findUsCoordinates)}&output=embed`;

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <ContactContainer>
      <Header navItems={navItems} />

      <Hero>
        <HeroContent>
          <HeroTitle>Get In Touch</HeroTitle>
          <HeroSubtitle>
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </HeroSubtitle>
        </HeroContent>
      </Hero>

      <Section ref={infoRef} $visible={infoVisible}>
        <SectionTitle>Contact Information</SectionTitle>
        <Grid>
          {contactInfoData.map((info, index) => (
            <InfoCard key={index}>
              <InfoIcon>
                <FontAwesomeIcon icon={info.icon} />
              </InfoIcon>
              <InfoTitle>{info.title}</InfoTitle>
              {info.lines.map((line, i) => (
                <InfoText key={i}>{line}</InfoText>
              ))}
            </InfoCard>
          ))}
        </Grid>
      </Section>

      <FormSection ref={formRef} $visible={formVisible}>
        <SectionTitle>Send Us a Message</SectionTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              $error={errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
              $error={errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              $error={errors.phone}
            />
            {errors.phone && (
              <ErrorMessage>{errors.phone.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Subject</Label>
            <Input
              type="text"
              placeholder="Enter message subject"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 5,
                  message: "Subject must be at least 5 characters",
                },
              })}
              $error={errors.subject}
            />
            {errors.subject && (
              <ErrorMessage>{errors.subject.message}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Message</Label>
            <TextArea
              rows="6"
              placeholder="Enter your message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              $error={errors.message}
            />
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} /> Send Message
              </>
            )}
          </SubmitButton>
        </Form>
      </FormSection>

      <MapSection>
        <SectionTitle>Find Us</SectionTitle>
        <iframe
          title="CivicPulse Location"
          src={mapEmbedSrc}
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen=""
          loading="lazy"
        />
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;
