import React from "react";
import MuiButton from "@mui/material/Button";

export default function DefaultButton({
  visibility = true,
  disabled = false,
  relative = false,
  minWidth,
  onClick,
  label,
  children,
  props,
}) {
  return (
    visibility && (
      <MuiButton
        variant="contained"
        aria-label={label}
        size="large"
        sx={{
          p: 2,
          m: 1,
          fontSize: "1.5rem",
          fontWeight: 500,
          position: relative ? "relative" : "absolute",
          lineHeight: "1.3rem",
          top: relative ? 0 : 5,
          left: relative ? 0 : 5,
          borderRadius: "15px",
          border: "0px solid white",
          marginBottom: 1,
          minWidth: minWidth,
          zIndex: 4,
          color: "white",
          bgcolor: disabled ? "primary.green" : "primary.red",
          opacity: disabled ? 0.7 : 1,
        }}
        onClick={onClick}
        {...props}
      >
        {label && !children && !props && label}
        {children}
      </MuiButton>
    )
  );
}
