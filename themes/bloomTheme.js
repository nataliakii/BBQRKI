"use client";
import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#124559",
      green: "#598392",
      fiolet: "#d70c6a",
      red: "#598392",
    },
    secondary: {
      main: "#598392",
      light: "#aec3b0",
      beige: "#d70c6a",
      background:
        "-webkit-radial-gradient(top,rgba(18, 69, 89, 0.95),rgba(18, 69, 89, 0.9),rgba(18, 69, 89, 0.85),  rgba(89, 131, 146, 0.9))",
      background1:
        "-webkit-radial-gradient(bottom,rgba(18, 69, 89, 0.95),rgba(18, 69, 89, 0.9),rgba(18, 69, 89, 0.85),  rgba(89, 131, 146, 0.9))",
      complement: "#C82013",
    },
    text: {
      light: "#eff6e0",
      dark: "#eff6e0",
      main: "#eff6e0",
      red: "#eff6e0",
      blue: "#C82013",
      menutitle: "##C82013",
    },
  },

  typography: {
    fontFamily: ["Oxygen Mono", "monospace"].join(","),
    h1: {
      fontSize: "50px",
      fontFamily: ["B612 Mono", "monospace"].join(","),
    },
    allVariants: {
      fontFamily: ["B612 Mono", "monospace"].join(","),
    },
  },
});
