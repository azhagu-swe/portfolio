import { createTheme, responsiveFontSizes, Theme } from "@mui/material/styles";


const neonGreen = {
  light: "#9AE6B4",
  main: "#68D391", 
  dark: "#48BB78",
  contrastText: "#1A202C", 
};

const goldenYellow = {
  light: "#FFECB3",
  main: "#FFC107",
  dark: "#FFA000",
  contrastText: "#000000",
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
    fontFamily: "Orbitron, sans-serif",
    fontSize: "1.8rem",
    fontWeight: 600,
  },
  h4: {
    fontFamily: "Orbitron, Arial, sans-serif",
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

// --- COMPONENT OVERRIDES ---
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
      '*::-webkit-scrollbar': {
        width: '12px',
      },
      '*::-webkit-scrollbar-track': {
        background: theme.palette.background.paper, 
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.dark,
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
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
        },
        // FIX: Added the required 'variants' property
        variants: [],
      },
      containedPrimary: ({ theme }: { theme: Theme }) => ({
        boxShadow: `0 4px 15px -5px ${theme.palette.primary.main}99`,
        "&:hover": {
          boxShadow: `0 6px 20px -5px ${theme.palette.primary.main}bb`,
        },
      }),
      containedSecondary: ({ theme }: { theme: Theme }) => ({
        boxShadow: `0 4px 15px -5px ${theme.palette.secondary.main}99`,
        "&:hover": {
          boxShadow: `0 6px 20px -5px ${theme.palette.secondary.main}bb`,
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: (props: { theme: Theme }) => ({
        borderRadius: "16px",
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
      primary: neonGreen,
      secondary: goldenYellow,
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
      primary: neonGreen,
      secondary: goldenYellow,
      background: { default: "#1A202C", paper: "#2D3748" }, 
      text: { primary: "#F7FAFC", secondary: "#A0AEC0" },
      divider: "rgba(255, 255, 255, 0.12)",
    },
  })
);
