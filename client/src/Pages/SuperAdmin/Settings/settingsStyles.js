import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const SettingsSection = styled.div`
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 1.5rem;
`;

export const SettingCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${theme.colors.glass.muted};
  border: ${theme.liquidGlass.border};
  border-radius: 12px;
  margin-bottom: 1rem;
`;

export const SettingLabel = styled.span`
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

export const SettingValue = styled.span`
  color: ${theme.colors.text.secondary};
`;

export const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${theme.colors.glass.base};
  color: ${theme.colors.text.primary};
  border: ${theme.liquidGlass.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

export const ConfigList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const ConfigItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${theme.colors.glass.muted};
  border: ${theme.liquidGlass.border};
  border-radius: 8px;
  color: ${theme.colors.text.primary};
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: ${theme.colors.glass.muted};
  border: ${theme.liquidGlass.border};
  border-radius: 10px;
  color: ${theme.colors.text.primary};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

export const ModalInputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const ModalLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

export const CategoryActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.3);
    transform: translateY(-2px);
  }
`;
