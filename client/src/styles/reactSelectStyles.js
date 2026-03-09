import { theme } from "./theme";

export const customReactSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: theme.colors.glass.base,
    backdropFilter: "blur(20px)",
    border: state.isFocused
      ? `1px solid rgba(255, 255, 255, 0.3)`
      : theme.liquidGlass.border,
    borderRadius: "12px",
    boxShadow: state.isFocused ? `0 0 0 1px rgba(255, 255, 255, 0.3)` : "none",
    color: theme.colors.text.primary,
    minHeight: "40px",
    "&:hover": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: theme.colors.glass.base,
    backdropFilter: "blur(20px)",
    border: theme.liquidGlass.border,
    borderRadius: "12px",
    zIndex: 9999,
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "rgba(255, 255, 255, 0.2)"
      : state.isFocused
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    color: theme.colors.text.primary,
    cursor: "pointer",
    "&:active": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: theme.colors.text.primary,
  }),
  input: (provided) => ({
    ...provided,
    color: theme.colors.text.primary,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: theme.colors.text.secondary,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: theme.colors.text.secondary,
    "&:hover": {
      color: theme.colors.text.primary,
    },
  }),
};
