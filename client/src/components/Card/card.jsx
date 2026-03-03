import React from "react";
import { CardContainer, CardTitle, CardContent } from "./cardStyles";

const Card = ({ title, children, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default Card;
