import React, { useState, useEffect } from "react";
import Head from "next/head";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import Layout from "@/components/common/Layout";
import GlobalErrorBoundary from "@/components/common/GlobalErrorBoundary";
import PageTransition from "@/components/ui/PageTransition";
import SplashScreen from "@/components/ui/SplashScreen";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import PWAInstallPrompt from "@/components/common/PWAInstallPrompt";
import PWAStatus from "@/components/common/PWAStatus";
import type { AppProps } from "next/app";
import { VisitorProvider } from "@/context/VisitorContext";
import "@/styles/globals.css";
import { setupGlobalErrorHandlers } from "@/utils/errorHandler";

if (typeof window !== 'undefined') {
  setupGlobalErrorHandlers();
}

function MyAppContent({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme, isDarkMode } = useThemeContext();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatedBackground enabled={true} />
        <PWAStatus />
        <PWAInstallPrompt />
        <Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode}>
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>
        </Layout>
      </MuiThemeProvider>
    </>
  );
}

export default function App(props: AppProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the splash screen after initial load
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Show splash for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <VisitorProvider>
        <GlobalErrorBoundary>
          {showSplash ? (
            <SplashScreen />
          ) : (
            <MyAppContent {...props} />
          )}
        </GlobalErrorBoundary>
      </VisitorProvider>
    </ThemeProvider>
  );
}
