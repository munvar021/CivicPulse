import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Badge } from "./priorityBadgeStyles";
import {
  getPriorityColor,
  getSeverityColor,
  formatStatus,
} from "../../utils/colorMapper";

const PriorityBadge = ({
  priority,
  severity,
  showIcon = true,
  variant = "default",
}) => {
  const value = priority || severity;
  if (!value) return null;

  const color = priority
    ? getPriorityColor(priority)
    : getSeverityColor(severity);
  const formattedValue = formatStatus(value);

  const getIcon = () => {
    const normalizedValue = value.toLowerCase();
    if (normalizedValue === "high" || normalizedValue === "critical") {
      return faExclamationCircle;
    }
    return faInfoCircle;
  };

  return (
    <Badge color={color} $variant={variant}>
      {showIcon && <FontAwesomeIcon icon={getIcon()} />}
      {formattedValue}
    </Badge>
  );
};

export default PriorityBadge;
