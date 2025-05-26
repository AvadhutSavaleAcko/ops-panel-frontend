import React, { useState, useRef, useEffect } from "react";
import {
  SearchBar,
  SearchWrapper,
  DropdownContainer,
  DropdownButton,
  DropdownList,
  DropdownItem,
  ArrowIcon,
  SearchInput,
  SearchButton,
  SearchIcon
} from "./styles";
import { getWidgetSpecificIsVisible } from "@utils/index";
import { connect } from "react-redux";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

interface SearchProps {
  is_visible?: boolean;
  value: string;
  onChange: (value: string) => void;
  onSearch: (selectedType: {
    id: string;
    label: string;
    placeholder: string;
  }) => void;
  searchTypes: Array<{
    id: string;
    label: string;
    placeholder: string;
  }>;
  showDropdown?: boolean;
}
const DropdownMenu: React.FC<{
  options: Array<{ id: string; label: string; placeholder: string }>;
  value: { id: string; label: string; placeholder: string };
  onChange: (value: { id: string; label: string; placeholder: string }) => void;
}> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <span>{value.label}</span>
        <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option.id}
              isSelected={option.id === value.id}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
export const Search: React.FC<SearchProps> = ({
  is_visible,
  value,
  onChange,
  onSearch,
  searchTypes,
  showDropdown
}) => {
  const [selectedType, setSelectedType] = useState(searchTypes[0]);
  if (is_visible === false) return null;

  useEffect(() => {
    const typeExists = searchTypes.find((type) => type.id === selectedType?.id);
    if (!typeExists) {
      setSelectedType(searchTypes[0]);
    }
  }, [searchTypes]);

  return (
    <SearchBar>
      <SearchWrapper>
        {showDropdown && searchTypes.length > 0 && (
          <DropdownMenu
            options={searchTypes}
            value={selectedType}
            onChange={setSelectedType}
          />
        )}
        <SearchInput
          type="text"
          placeholder={selectedType?.placeholder || "Enter search term"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <SearchButton onClick={() => onSearch(selectedType)}>
          <SearchIcon>🔍</SearchIcon>
          Search
        </SearchButton>
      </SearchWrapper>
    </SearchBar>
  );
};
export default connect(mapStateToProps)(Search);
