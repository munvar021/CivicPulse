import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
