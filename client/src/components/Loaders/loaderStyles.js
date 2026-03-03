import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const LoaderFullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0b0f14 0%, #1a1f2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease;
`;

export const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const LoaderInline = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 999;
`;

export const CivicLoader = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #3b82f6;
  border-right-color: #3b82f6;
  animation: ${rotate} 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    right: -3px;
    width: 12px;
    height: 12px;
    background: #3b82f6;
    border-radius: 50%;
    box-shadow: 0 0 20px #3b82f6;
  }
`;

export const SpinnerRingInner = styled.div`
  position: absolute;
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-bottom-color: #8b5cf6;
  border-left-color: #8b5cf6;
  animation: ${rotate} 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite
    reverse;
`;

export const LoaderIcon = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
`;

export const LoaderText = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  animation: ${pulse} 2s ease-in-out infinite;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const LoaderDots = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  animation: ${pulse} 1.4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || "0s"};
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
`;
