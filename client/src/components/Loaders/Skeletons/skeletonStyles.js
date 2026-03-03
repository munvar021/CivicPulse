import styled, { keyframes, css } from "styled-components";
import { theme } from "../../../styles/theme";

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const shimmerEffect = css`
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const SkeletonContainer = styled.div`
  background: ${theme.colors.glass.base};
  backdrop-filter: ${theme.liquidGlass.backdropFilter};
  -webkit-backdrop-filter: ${theme.liquidGlass.WebkitBackdropFilter};
  border: ${theme.liquidGlass.border};
  border-radius: 16px;
  padding: ${({ $padding }) => $padding || "1.5rem"};
  box-shadow: ${theme.liquidGlass.boxShadow};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${shimmerEffect}
    opacity: 0.5;
  }
`;

export const SkeletonLine = styled.div`
  background-color: ${theme.colors.glass.surface};
  border-radius: 4px;
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "1rem"};
  margin-bottom: ${({ $mb }) => $mb || "0"};
  margin-top: ${({ $mt }) => $mt || "0"};
  opacity: 0.7;
  position: relative;
  z-index: 1;
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols || 1}, 1fr);
  gap: ${({ $gap }) => $gap || "1rem"};
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: repeat(
      ${({ $colsMobile }) => $colsMobile || 1},
      1fr
    );
  }
`;

export const SkeletonCard = styled.div`
  background-color: ${theme.colors.glass.surface};
  border-radius: 8px;
  padding: ${({ $padding }) => $padding || "1rem"};
  height: ${({ $height }) => $height || "120px"};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${shimmerEffect}
    opacity: 0.7;
  }
`;

export const DashboardSkeletonWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SkeletonSection = styled(SkeletonContainer)`
  margin-top: 2rem;
`;

export const ComplaintList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CenteredButton = styled(SkeletonLine)`
  margin: 1rem auto 0;
`;
