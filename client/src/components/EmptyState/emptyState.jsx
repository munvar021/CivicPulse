import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  IconWrapper,
  Title,
  Description,
  ActionWrapper,
} from "./emptyStateStyles";

const EmptyState = ({
  icon = faInbox,
  title = "No data available",
  description,
  action,
  variant = "default",
}) => {
  return (
    <Container $variant={variant}>
      <IconWrapper>
        <FontAwesomeIcon icon={icon} />
      </IconWrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {action && <ActionWrapper>{action}</ActionWrapper>}
    </Container>
  );
};

export default EmptyState;
