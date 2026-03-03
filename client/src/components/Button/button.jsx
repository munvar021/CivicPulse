import React from "react";
import { StyledButton } from "./buttonStyles";

const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  style,
  className,
}) => {
  return (
    <StyledButton
      $variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
