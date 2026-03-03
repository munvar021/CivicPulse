import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RoleHeader from "../../Headers/roleHeader";
import Loader from "../../Loaders/loader";
import {
  PageContainer,
  BackButton,
  FormCard,
  PageTitle,
  FormContent,
  ErrorMessage,
} from "./formPageLayoutStyles";

const FormPageLayout = ({
  title,
  onBack,
  backLabel = "Back",
  loading = false,
  error = null,
  children,
}) => {
  if (loading) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <Loader size="large" />
        </PageContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <ErrorMessage>Error: {error}</ErrorMessage>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <RoleHeader />
      <PageContainer>
        {onBack && (
          <BackButton onClick={onBack} title={backLabel}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </BackButton>
        )}
        <FormCard>
          <PageTitle>{title}</PageTitle>
          <FormContent>{children}</FormContent>
        </FormCard>
      </PageContainer>
    </>
  );
};

export default FormPageLayout;
