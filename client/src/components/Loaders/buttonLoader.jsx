import React from "react";
import { SpinnerContainer, Spinner } from "./buttonLoaderStyles";

const ButtonLoader = ({ size = "small" }) => {
  return (
    <SpinnerContainer>
      <Spinner $size={size} />
    </SpinnerContainer>
  );
};

export default ButtonLoader;
