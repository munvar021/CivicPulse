import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserShield,
  faUserTie,
  faBolt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Card,
  Title,
  Subtitle,
  RoleGrid,
  RoleCard,
  RoleIcon,
  RoleTitle,
  RoleDescription,
  BackLink,
} from "./authStyles";

const RoleSelection = () => {
  return (
    <Container>
      <Card>
        <Title>Welcome to CivicPulse</Title>
        <Subtitle>Please select your role to continue</Subtitle>
        <RoleGrid>
          <RoleCard to="/citizen/login">
            <RoleIcon>
              <FontAwesomeIcon icon={faUser} />
            </RoleIcon>
            <RoleTitle>Citizen</RoleTitle>
            <RoleDescription>Report and track civic issues</RoleDescription>
          </RoleCard>
          <RoleCard to="/officer/login">
            <RoleIcon>
              <FontAwesomeIcon icon={faUserShield} />
            </RoleIcon>
            <RoleTitle>Field Officer</RoleTitle>
            <RoleDescription>Manage and resolve issues</RoleDescription>
          </RoleCard>
          <RoleCard to="/admin/login">
            <RoleIcon>
              <FontAwesomeIcon icon={faUserTie} />
            </RoleIcon>
            <RoleTitle>Department Admin</RoleTitle>
            <RoleDescription>Oversee department operations</RoleDescription>
          </RoleCard>
        </RoleGrid>
        <BackLink to="/" title="Back to Home">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Home
        </BackLink>
      </Card>
    </Container>
  );
};

export default RoleSelection;
