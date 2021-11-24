import { createTheme as createMuiTheme } from "@mui/material/styles";

interface CreateThemeOptions {
  prefersLightMode: boolean;
}

// Create a theme instance.
export function createTheme({ prefersLightMode }: CreateThemeOptions) {
  return createMuiTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        '"Segoe UI"',
        "Helvetica Neue",
        "Helvetica",
        "Roboto",
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
      ].join(","),
    },
    palette: {
      mode: prefersLightMode ? "light" : "dark",
      primary: {
        main: prefersLightMode ? "hsl(213, 100%, 52%)" : "hsl(213, 100%, 73%)",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
  });
}
