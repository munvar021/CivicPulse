import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(10px);
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  color: ${theme.colors.text.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background: ${theme.colors.glass.muted};
  backdrop-filter: blur(10px);
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  color: ${theme.colors.text.primary};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${theme.colors.glass.base};
  backdrop-filter: blur(20px);
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${theme.colors.glass.base};
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

export const FileInputText = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

export const LocationInput = styled(Input)``;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
`;

export const ImagePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: ${theme.colors.glass.muted};
`;

export const ImagePreview = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #ef4444;
    transform: scale(1.1);
  }
`;

export const CurrentImagesSection = styled.div`
  margin-bottom: 1rem;
`;

export const CurrentImagesLabel = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: ${theme.colors.glass.muted};
`;

export const NewImagesGrid = styled(ImagesGrid)``;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;
