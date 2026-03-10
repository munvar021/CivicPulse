import styled from "styled-components";
import { fadeIn, scaleIn } from "../../styles/animations";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleIn} 0.3s ease-out;

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 95vh;
  }
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    max-height: 85vh;
    border-radius: 8px;
  }
`;

export const CloseButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1) rotate(90deg);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
`;

export const NavigationButton = styled.button`
  position: fixed;
  top: 50%;
  ${(props) => (props.direction === "left" ? "left: 2rem;" : "right: 2rem;")}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    ${(props) => (props.direction === "left" ? "left: 1rem;" : "right: 1rem;")}
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
  }
`;

export const ImageCounter = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  z-index: 10001;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    bottom: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;
