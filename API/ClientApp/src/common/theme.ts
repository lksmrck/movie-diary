const Color = {
  teal_1: "#35a99f",
  teal_2: "#2d8f87",
  teal_3: "#15413e",
  teal_4: "#113432",

  //Grey
  grey_1: "#f6f4f5",
  grey_2: "#efeaec",
  grey_3: "#e0d7da",
};

const FontSize = {
  M: "1rem",
};

const Spacing = {
  S: ".25rem",
  M: ".5rem",
  L: "1rem",
  XL: "1.25rem",
  XXL: "1.5rem",
};

const CardWidth = {
  S: 20,
  M: 30,
  L: 40,
};

const BorderRadius = {
  S: "5px",
};

export const Theme = {
  Color,
  FontSize,
  Spacing,
  CardWidth,
  BorderRadius,
};

///////////////////////////////
// MUI theme //////////////////
///////////////////////////////
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const mui_theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
