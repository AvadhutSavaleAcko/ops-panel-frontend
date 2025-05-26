import React, { useState, useEffect, useRef, FC, ReactNode } from "react";
import {
  Input,
  Label,
  InputWrapper,
  Note,
  ErrorText,
  DropDown,
  MobilePrefix,
  IconContainer,
  InputContainer,
} from "./styles";
import Image from "@components/imageContainer";
import { resolvePath } from "@utils/resolvePath";
import { scrollIntoViewWrapper } from "@utils/index";

interface InputFieldProps {
  value: string;
  touched: any;
  errors: any;
  handleChange?: Function;
  handleBlur?: Function;
  placeholder: string;
  name: string;
  note?: string;
  type?: string;
  onChange?: Function;
  readOnly?: boolean;
  handleClick?: Function;
  showError?: boolean;
  setShowError?: Function;
  autoCapitalize?: boolean;
  className?: string;
  dropdown?: boolean;
  dropdownStyles?: any;
  autoFocus?: boolean;
  inputStyles?: any;
  disabled?: boolean;
  hideLabelText?: boolean;
  customHandleBlur?: Function;
  inputContainerStyles?: any;
  location?: boolean;
  autoComplete?: string;
  onFocus?: () => void;
  mobilePrefix?: boolean;
  Icon?: any;
  calendarIcon?: boolean;
  showCrossIcon?: boolean;
  isDesktop: boolean | string;
  iconStyles?: any
}

const InputFieldGeneric: FC<InputFieldProps> = ({
  value,
  touched,
  errors,
  handleChange,
  handleBlur,
  placeholder,
  name,
  note,
  type = "text",
  onChange,
  readOnly = false,
  handleClick,
  showError = false,
  setShowError,
  autoCapitalize = false,
  className,
  dropdown = false,
  dropdownStyles,
  autoFocus = false,
  inputStyles,
  disabled = false,
  hideLabelText = false,
  customHandleBlur,
  inputContainerStyles,
  location = false,
  autoComplete = "off",
  onFocus,
  mobilePrefix = false,
  Icon,
  isDesktop,
  iconStyles
}) => {
  const [focused, setFocused] = useState(false);
  const [isAutoFocused, setisAutoFocused] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus && !isAutoFocused && inputEl.current) {
      inputEl.current.focus();
      setisAutoFocused(true);
    }
  }, [autoFocus, isAutoFocused]);

  useEffect(() => {
    if (focused && inputEl.current) {
      inputEl.current.focus();
      scrollIntoViewWrapper(inputEl.current?.name);
    }
  }, [focused]);

  return (
    <InputWrapper isDesktop={isDesktop} styles={inputContainerStyles}>
      <InputContainer onClick={handleClick}>
        <Input
          isPrefix={mobilePrefix}
          ref={inputEl}
          placeholder={placeholder}
          id={name}
          key={name}
          type={type}
          name={name}
          value={value}
          autoComplete={autoComplete}
          onChange={(e: any) => {
            if (handleChange) handleChange(e);
            if (showError && setShowError) setShowError(false);
            let inputValue = autoCapitalize
              ? e.target.value.toUpperCase()
              : e.target.value;
            inputValue = inputValue;
            if (onChange) onChange(inputValue);
          }}
          onBlur={(e: any) => {
            if (handleBlur) handleBlur(e);
            if (customHandleBlur) customHandleBlur(e);
            setFocused(false);
          }}
          onFocus={() => {
            if (onFocus) onFocus();
            setFocused(true);
          }}
          isError={!!(errors?.[name] && touched?.[name])}
          readOnly={readOnly}
          autoCapitalize={autoCapitalize}
          className={className}
          isDesktop={isDesktop}
          pointerCursor={dropdown || location}
          styles={inputStyles}
          disabled={disabled}
        />
        <Label focused={focused}>{hideLabelText ? "" : placeholder}</Label>
        {mobilePrefix && <MobilePrefix>+91</MobilePrefix>}
        {/* TODO: ADD TRANSITION && TRANSFORM WHEN CLICKED */}
        {Icon && (
          <IconContainer iconStyles={iconStyles}>
            <Image
              imgSrc={resolvePath("/images/icons/chevron-down.svg")}
              alt="chevron-down"
              width={24}
              height={24}
              styles={{
                transform: focused ? "rotate(-180deg)" : "rotate(0deg)",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out 0.15s",
              }}
            />
          </IconContainer>
        )}
      </InputContainer>
      {/* {Icon} */}
      {(showError || (errors?.[name] && touched?.[name])) && (
        <ErrorText isDesktop={isDesktop} size="xxs" margin={"0.25rem 0rem"}>
          {errors[name]}
        </ErrorText>
      )}
      {note && <Note isDesktop={isDesktop}>{note}</Note>}
      {dropdown && <DropDown style={dropdownStyles} onClick={handleClick} />}
    </InputWrapper>
  );
};

export default InputFieldGeneric;
