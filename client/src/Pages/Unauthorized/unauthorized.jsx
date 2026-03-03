import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  PageContainer,
  ContentCard,
  ErrorCode,
  ErrorTitle,
  ErrorMessage,
  ButtonGroup,
  HomeButton,
} from "./unauthorizedStyles";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentCard>
        <ErrorCode>
          <FontAwesomeIcon icon={faLock} />
        </ErrorCode>
        <ErrorTitle>Access Denied</ErrorTitle>
        <ErrorMessage>
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </ErrorMessage>
        <ButtonGroup>
          <HomeButton onClick={() => navigate(-1)} title="Go Back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </HomeButton>
          <HomeButton onClick={() => navigate("/")}>Go to Home</HomeButton>
        </ButtonGroup>
      </ContentCard>
    </PageContainer>
  );
};

export default Unauthorized;
