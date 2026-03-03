import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  PageContainer,
  ContentCard,
  ErrorCode,
  ErrorTitle,
  ErrorMessage,
  HomeButton,
} from "./notFoundStyles";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentCard>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorMessage>
          The page you are looking for doesn't exist or has been moved.
        </ErrorMessage>
        <HomeButton onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faHome} /> Go to Home
        </HomeButton>
      </ContentCard>
    </PageContainer>
  );
};

export default NotFound;
