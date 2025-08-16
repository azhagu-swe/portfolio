import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, useThemeContext } from "../context/ThemeContext";
import Layout from "../components/Layout";
import type { AppProps } from "next/app";
import "@fontsource/orbitron";
import "@fontsource/poppins";
import { VisitorProvider } from "@/context/VisitorContex";

const AppContent: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { theme, toggleTheme, isDarkMode } = useThemeContext();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
        <Component {...pageProps} />
      </Layout>
    </MuiThemeProvider>
  );
};

export default function MyApp(props: AppProps) {
  return (
    <VisitorProvider>
      <ThemeProvider>
        <AppContent {...props} />
      </ThemeProvider>
    </VisitorProvider>
  );
}
