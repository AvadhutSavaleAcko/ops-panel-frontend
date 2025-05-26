import React, { useState, useEffect } from "react";
import { debounce } from "utils/lodash";
import { styled, Box } from "@acko-tech/building-blocks.ui.common";
import Input from "./searchInput";

const StyledInput = styled(Input)`
  input {
    font-size: 16px;
  }
  width: 100%;
    ${(props: { isDesktop: any }) => (props.isDesktop ? `margin-top: 4px` : "")}
`;

// TODO: CHANGE ANY TYPE TO ACTUAL INTERFACE LINE -> 161
const GenericSearch: React.FC<ComponentProps> = ({
  searchInput,
  setSearchInput,
  placeholder,
  inputFontSize,
  inputHeight,
  searchCallback,
  showCrossIcon = true,
  pb = false,
  isDesktop,
  query
}) => {
  const [input, setInput] = useState<string>(searchInput);

  console.log("^^^ make data input inside search", {
    input,
    searchInput,
    query
  });
  const debouncedChangeInput = debounce(setInput, 300);

  useEffect(() => {
    // lifting input state to parent MMV component for fuse search
    setSearchInput(input);
  }, [debouncedChangeInput]);

  useEffect(() => {
    setInput("");
    setSearchInput("");
  }, [query]);

  return (
    <Box>
      <div style={pb ? { paddingBottom: "1rem" } : {}} key={query}>
        <StyledInput
          height={inputHeight}
          fontSize={inputFontSize}
          handleChange={debouncedChangeInput}
          onFocus={searchCallback}
          placeholder={placeholder}
          isDesktop={isDesktop}
          backgroundColor={isDesktop ? "#F8F8FB" : ""}
          showCrossIcon={showCrossIcon}
          styledCrossIcon={{ right: "-1.8rem" }}
        />
      </div>
    </Box>
  );
};

export { GenericSearch as InputSearch };

// TODO: Define the prop types for better type-checking
interface ComponentProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  placeholder?: string;
  inputFontSize?: string;
  inputHeight?: string;
  searchCallback?: () => void;
  showCrossIcon?: boolean;
  pb?: boolean;
  isDesktop: boolean;
  query: string;
}
