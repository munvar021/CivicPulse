import React from "react";
import { Badge } from "./statusBadgeStyles";
import { getStatusColor, formatStatus } from "../../utils/colorMapper";

const StatusBadge = ({ status, variant = "default" }) => {
  if (!status) return null;

  const color = getStatusColor(status);
  const formattedStatus = formatStatus(status);

  return (
    <Badge color={color} $variant={variant}>
      {formattedStatus}
    </Badge>
  );
};

export default StatusBadge;
