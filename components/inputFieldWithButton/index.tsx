import React from "react";
import { FieldButton, FieldButtonWrapper, StyledInput } from "./styles";

function InputWidgetWithButton(props) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        height: "48px",
        marginTop: "16px",
        borderRadius: "12px",
        border: "1px solid rgba(27, 115, 232, 0.10)"
      }}
    >
      <>
        <StyledInput
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
          onKeyPress={props.keypress}
          name="carNumber"
          // style={{
          //   color: "#0B3874",
          //   width: "calc(100% - 24px)",
          //   borderRadius: "10px",
          //   background: "#ffffff",
          //   padding: "16px 12px",
          //   fontSize: "1rem",
          //   lineHeight: "16px",
          //   outline: "none",
          //   border: "none"
          // }}
          type="text"
          placeholder={props.placeholder || "Enter your car number"}
          disabled={props.showLoader}
        />

        <FieldButtonWrapper>
          {/* <div
            style={{
              position: "absolute",
              right: "8px",
              top: "8px",
              width: "140px"
            }}
          > */}
          <FieldButton
            onClick={props.clickHandler}
            loading={props.showLoader}
            isFullWidth={false}
            isTransparent
            disabled={props.disabled}
            syles={{
              maxHeight: "40px",
            }
            }
          >
            {props.CTA || "Apply"}
          </FieldButton>
        </FieldButtonWrapper>
      </>
      <div
        style={{
          color: "#D83D37",
          fontWeight: 400,
          fontSize: "12px",
          marginTop: "8px",
          minHeight: "14px",
          lineHeight: "18px"
        }}
      >
        {props?.error || ""}
      </div>
    </div >
  );
}

export default InputWidgetWithButton;
