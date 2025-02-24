import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Define colors
const neonGreen = {
  light: "#76FF7A",
  main: "#32CD32",
  dark: "#228B22",
  contrastText: "#FFFFFF",
};

const goldenYellow = {
  light: "#FFECB3",
  main: "#FFC107",
  dark: "#FFA000",
  contrastText: "#000000",
};

// Define typography
const typography = {
  fontFamily: "Poppins, Arial, sans-serif",
  h1: {
    fontFamily: "Orbitron, Arial, sans-serif",
    fontSize: "2.5rem",
    fontWeight: 700,
    color: neonGreen.main,
  },
  h2: {
    fontFamily: "Orbitron, Arial, sans-serif",
    fontSize: "2rem",
    fontWeight: 600,
    color: neonGreen.main,
  },
  h3: {
    fontFamily: "Orbitron, Arial, sans-serif",
    fontSize: "1.75rem",
    fontWeight: 500,
    color: neonGreen.main,
  },
  h4: {
    fontFamily: "Orbitron, Arial, sans-serif",
    fontSize: "1.5rem",
    fontWeight: 500,
    color: neonGreen.main,
  },
  body1: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
};

// Define components
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none", // Prevent all caps text on buttons
        borderRadius: "8px", // Rounded corners for buttons
        padding: "8px 16px", // Consistent padding
        variants: [], // Add an empty variants array
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "16px",
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      h1: {
        color: neonGreen.main,
      },
      h2: {
        color: goldenYellow.main,
      },
    },
  },
};

// Define base theme
const baseTheme = {
  typography,
  components,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

// Create light theme
export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: "light",
      primary: neonGreen,
      secondary: goldenYellow,
      background: {
        default: "#F0F2F5",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#2B2D42",
        secondary: "#6C757D",
      },
    },
  })
);

// Create dark theme
export const darkTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: "dark",
      primary: neonGreen,
      secondary: goldenYellow,
      background: {
        default: "#121212",
        paper: "#1E1E1E",
      },
      text: {
        primary: "#E5E5E5",
        secondary: "#9CA3AF",
      },
    },
  })
);

// Add global styles
export const globalStyles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "Poppins, Arial, sans-serif",
    backgroundColor: lightTheme.palette.background.default,
    color: lightTheme.palette.text.primary,
  },
  a: {
    color: neonGreen.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};
