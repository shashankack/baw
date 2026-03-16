import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    blurred: true;
  }
}
import { ButtonPropsVariantOverrides } from "@mui/material/Button";
import { colors } from "@mui/material";
import { transform } from "next/dist/build/swc/generated-native";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    blurred: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1563FF",
    },
    background: {
      default: "#FCF3E3",
      paper: "#FCF3E3",
    },
    text: {
      primary: "#1563FF",
      secondary: "#222",
    },
  },
  typography: {
    fontFamily: "Manrope, Geist Mono, Arial, sans-serif",
    h1: {
      fontFamily: "Manrope, Arial, sans-serif",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "Manrope, Arial, sans-serif",
    },
    body1: {
      fontFamily: "Geist Mono, monospace",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Manrope, Arial, sans-serif",
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "999px",
          padding: "6px 20px",

          "&:hover": {
            "& svg": {
              transition: "transform 0.3s ease",
              transform: "rotate(450deg)",
            },
          },
        },
        // Filled / contained variant
        contained: {
          backgroundColor: "#1563FF",
          color: "#FCF3E3",
          padding: "6px 30px",

          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#FCF3E3",
            color: "#1563FF",
            boxShadow: "none",
            outline: "1px solid #1563FF",
          },
        },
        // Text variant
        text: {
          color: "#1563FF",
          border: "1px solid transparent",
          "&:hover": {
            border: "1px solid #1563FF",
            backgroundColor: "transparent",
            textUnderlineOffset: "4px",
          },
        },
      },
      variants: [
        {
          props: { variant: "blurred" },
          style: {
            backgroundColor: "rgba(252, 243, 227, 0.10)",
            border: "1px solid #1563FF",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            color: "#1563FF",
            "&:hover": {
              transform: "translateY(-2px)",
              color: "#FCF3E3",
              backgroundColor: "#1563FF",
              borderColor: "#1563FF",
            },
          },
        },
      ],
    },
  },
});

export default theme;
