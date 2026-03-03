import React from "react";
import Select from "react-select";
import { FilterContainer, FilterGroup, Label } from "./filterStyles";
import { customReactSelectStyles } from "../../styles/reactSelectStyles";

const Filter = ({ filters, noMargin }) => {
  return (
    <FilterContainer $noMargin={noMargin}>
      {filters.map((filter, index) => (
        <FilterGroup key={index}>
          <Label>{filter.label}:</Label>
          <Select
            value={filter.options.find((opt) => opt.value === filter.value)}
            onChange={filter.onChange}
            options={filter.options}
            styles={customReactSelectStyles}
            isSearchable={filter.isSearchable !== false}
            placeholder={filter.placeholder || `Select ${filter.label}`}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
        </FilterGroup>
      ))}
    </FilterContainer>
  );
};

export default Filter;
