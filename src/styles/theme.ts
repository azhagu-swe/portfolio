import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";

const mintGreen = {
  light: "#9AE6B4",
  main: "#68D391", 
  dark: "#48BB78",
  contrastText: "#1A202C", 
};

const neutralGray = {
  light: "#E2E8F0",
  main: "#A0AEC0",
  dark: "#718096",
  contrastText: "#1A202C",
};

const typography = {
  fontFamily: "Poppins, Arial, sans-serif",
  h1: {
    fontFamily: "Orbitron, Arial, sans-serif",
    fontSize: "3rem",
    fontWeight: 700,
  },
  h2: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "2.2rem",
    fontWeight: 600,
  },
  h3: {
    fontFamily: "Poppins, Arial,sans-serif",
    fontSize: "1.8rem",
    fontWeight: 600,
  },
  h4: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  body1: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "1rem",
    lineHeight: 1.7,
  },
  body2: {
    fontFamily: "Poppins, Arial, sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },
};

// COMPONENT & GLOBAL STYLES
const components = {
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      body: {
        scrollBehavior: "smooth",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      a: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        transition: "color 0.2s ease-in-out",
        "&:hover": {
          color: theme.palette.primary.light,
        },
      },
      // ADDED: Custom scrollbar that matches the theme
      '*::-webkit-scrollbar': {
        width: '12px',
      },
      '*::-webkit-scrollbar-track': {
        background: theme.palette.background.paper, 
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px',
        border: `3px solid ${theme.palette.background.paper}`,
      },
    }),
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: "8px",
        padding: "8px 20px",
        fontWeight: "bold",
        variants: [],
      },
      containedPrimary: {
        transition: "transform 0.2s ease-in-out, background-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          backgroundColor: mintGreen.light,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: (props: { theme: Theme }) => ({
        borderRadius: "16px",
        padding: "16px",
        border: `1px solid ${props.theme.palette.divider}`,
        backgroundColor: props.theme.palette.background.paper,
        boxShadow: "none",
      }),
    },
  },
  MuiTypography: {
    styleOverrides: {
      h1: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.primary.main,
      }),
      h2: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.text.primary, 
      }),
    },
  },
};

const baseTheme = {
  typography,
  components,
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
};

export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: "light",
      primary: mintGreen,
      secondary: neutralGray,
      background: { default: "#F7FAFC", paper: "#FFFFFF" },
      text: { primary: "#2D3748", secondary: "#718096" },
      divider: "rgba(0, 0, 0, 0.12)",
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: "dark",
      primary: mintGreen,
      secondary: neutralGray,
      background: { default: "#1A202C", paper: "#2D3748" }, 
      text: { primary: "#F7FAFC", secondary: "#A0AEC0" },
      divider: "rgba(255, 255, 255, 0.12)",
    },
  })
);
