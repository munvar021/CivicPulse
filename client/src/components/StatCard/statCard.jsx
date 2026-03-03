import React from "react";
import {
  StatCardContainer,
  StatValue,
  StatLabel,
  StatIcon,
} from "./statCardStyles";
import SkeletonStatCard from "../Loaders/Skeletons/skeletonStatCard";

const StatCard = ({ label, value, icon, color, isLoading = false }) => {
  if (isLoading) {
    return <SkeletonStatCard />;
  }

  return (
    <StatCardContainer color={color}>
      {icon && <StatIcon>{icon}</StatIcon>}
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatCardContainer>
  );
};

export default StatCard;
