import React, { useRef, useState } from "react";
import { styled } from "@acko-tech/building-blocks.ui.common";
import {
  $grayLight,
  $error
} from "@acko-tech/building-blocks.ui.common";
import SearchIcon from "@public/images/icons/search-icon.svg";
import CrossIcon from "@public/images/icons/cross-icon.svg";

const StyledInput = styled.input<StypeProps>`
  box-sizing: border-box;
  font-family: "Euclid Circular B";
  height: 48px;
  width: 100%;
  border-radius: 8px;
  color: #5b5675;
  font-size: 14px;
  background-color: #f8f7fc;
  font-weight: 400;
  line-height: 20px;
  border: 1px solid ${$grayLight};
  padding-left: 45px;
  -webkit-appearance: none;
  ::placeholder {
    font-weight: 400;
    line-height: 20px;
    font-size: 14px;
    color: #5b5675;
    text-transform: none;
  }
  ${(props: StypeProps) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor}` : ""}
  :focus {
    outline: none;
    border: 1px solid
      ${(props: StypeProps) => (props.error ? $error : "#7C47E1")};
    color: #040222;
    background-color:  #ffffff;
  }
`;

const Container = styled.div`
  position: relative;
`;


export default function SearchInput(props: ComponentProps) {
  const timerRef = useRef<number | NodeJS.Timeout | null>(null);
  const styledInputRef = useRef<any>(null);

  const onInputChange = (event: any) => {
    event.persist();
    if (timerRef.current) {
      clearTimeout(timerRef.current as number);
    }

    timerRef.current = setTimeout(() => {
      props.handleChange(event.target.value);
    }, 300);
  };

  const handleCrossClick = (e) => {
    // Clearing the search if clicked on crossIcon
    e?.preventDefault();
    props?.handleChange("");
    //@ts-ignore
    if (styledInputRef.current) {
      styledInputRef.current.value = "";
    }
  };

  // only show cross icon if there is input value
  const inputValue = styledInputRef?.current?.value;

  return (
    <Container className={props.className}>
      <StyledInput
        error={props.error}
        onChange={onInputChange}
        onFocus={props.onFocus}
        type="text"
        placeholder={props.placeholder}
        backgroundColor={props.backgroundColor}
        autoFocus={props.autoFocus}
        ref={styledInputRef}
        hasValue = {styledInputRef?.current?.value}
      />
      <div
        style={{
          width: "24px",
          height: "24px",
          position: "absolute",
          left: "16px",
          top: "12px",
          padding: " 2.8px 3.671px 3.761px 2.799px",
          display: "flex",
        }}
      >
        <SearchIcon style={{ height: "75%", width: "75%" }} />
      </div>
      {props?.showCrossIcon && inputValue && (
        <div
          onClick={handleCrossClick}
          style={{
            position: "absolute",
            height: "24px",
            width: "24px",
            padding: "padding: 3px 3.52px 3.52px 3px",
            right: "1rem",
            top: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <CrossIcon style={{ height: "75%", width: "75%" }} />
        </div>
      )}
    </Container>
  );
}

interface StypeProps {
  error?: boolean;
  backgroundColor?: string;
}

interface ComponentProps {
  error?: boolean;
  placeholder: string;
  handleChange(value: string): void;
  className?: string;
  onFocus?: any;
  backgroundColor?: string;
  autoFocus?: any;
  // prop to show cross icon on right of input box
  showCrossIcon?: boolean | any;
}
