import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "@/components/common/Layout";
import GlobalErrorBoundary from "@/components/common/GlobalErrorBoundary";
import PageTransition from "@/components/ui/PageTransition";
import SplashScreen from "@/components/ui/SplashScreen";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import type { AppProps } from "next/app";
import { VisitorProvider } from "@/context/VisitorContext";
import "@/styles/globals.css";
import { setupGlobalErrorHandlers } from "@/utils/errorHandler";

if (typeof window !== 'undefined') {
  setupGlobalErrorHandlers();
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the splash screen after initial load
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Show splash for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <VisitorProvider>
        <GlobalErrorBoundary>
          {showSplash ? (
            <SplashScreen />
          ) : (
            <>
              <AnimatedBackground enabled={true} />
              <Layout>
                <PageTransition>
                  <Component {...pageProps} />
                </PageTransition>
              </Layout>
            </>
          )}
        </GlobalErrorBoundary>
      </VisitorProvider>
    </ThemeProvider>
  );
}
