import styled, { keyframes } from "styled-components";
import { liquidGlassEffect } from "../../styles/liquidGlass";

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const TimelineContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
`;

export const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
`;

export const TimelineList = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 2rem 0;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent,
      #3b82f6 10%,
      #3b82f6 90%,
      transparent
    );
  }

  @media (max-width: 768px) {
    &::before {
      left: 20px;
    }
  }
`;

export const TimelineItem = styled.div`
  position: relative;
  width: 50%;
  padding: 0 2rem 4rem;
  ${({ index }) =>
    index % 2 === 0
      ? "left: 0; padding-right: 3rem;"
      : "left: 50%; padding-left: 3rem;"}
  opacity: 0;
  animation: ${({ index, isVisible }) =>
      isVisible
        ? index % 2 === 0
          ? slideInFromLeft
          : slideInFromRight
        : "none"}
    0.6s ease-out forwards;

  &:last-child {
    padding-bottom: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0 !important;
    padding: 0 0 3rem 3rem;
    animation: ${({ isVisible }) => (isVisible ? slideInFromLeft : "none")} 0.6s
      ease-out forwards;
  }
`;

export const TimelineDot = styled.div`
  position: absolute;
  ${({ index }) => (index % 2 === 0 ? "right: -20px;" : "left: -20px;")}
  top: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  z-index: 2;
  box-shadow:
    0 0 0 4px #0b0f14,
    0 0 0 6px #3b82f6;
  transition: all 0.3s ease;

  ${TimelineItem}:hover & {
    transform: scale(1.2);
    box-shadow:
      0 0 0 4px #0b0f14,
      0 0 0 8px #60a5fa;
  }

  @media (max-width: 768px) {
    left: 0 !important;
    right: auto !important;
  }
`;

export const TimelineContent = styled.div`
  ${liquidGlassEffect}
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const TimelineDate = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;

  ${TimelineContent}:hover & {
    background-color: #3b82f6;
    color: white;
  }
`;

export const TimelineEventTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 600;
`;

export const TimelineUpdatedBy = styled.p`
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
  color: rgba(255, 255, 255, 0.72);
`;

export const TimelineDescription = styled.p`
  font-style: italic;
  margin: 0.75rem 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
  white-space: pre-line;
  font-size: 0.95rem;
`;

export const ImageGrid = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const TimelineImage = styled.img`
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 75px;
  }
`;

export const MetadataBox = styled.div`
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.6rem;
  }
`;

export const MetadataText = styled.p`
  margin: 0.25rem 0;
  color: rgba(255, 255, 255, 0.8);
`;
