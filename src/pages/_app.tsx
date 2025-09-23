import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import Layout from "@/components/common/Layout";
import GlobalErrorBoundary from "@/components/common/GlobalErrorBoundary";
import type { AppProps } from "next/app";
import { VisitorProvider } from "@/context/VisitorContext";
import "@/styles/globals.css";
import { setupGlobalErrorHandlers } from "@/utils/errorHandler";

// Setup global error handlers
if (typeof window !== 'undefined') {
  setupGlobalErrorHandlers();
}

function MyAppContent({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme, isDarkMode } = useThemeContext();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
        <Component {...pageProps} />
      </Layout>
    </MuiThemeProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <ThemeProvider>
      <VisitorProvider>
        <GlobalErrorBoundary>
          <MyAppContent {...props} />
        </GlobalErrorBoundary>
      </VisitorProvider>
    </ThemeProvider>
  );
}
