import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  width: ${({ $size }) =>
    $size === "small" ? "16px" : $size === "medium" ? "20px" : "24px"};
  height: ${({ $size }) =>
    $size === "small" ? "16px" : $size === "medium" ? "20px" : "24px"};
`;
