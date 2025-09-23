import React, { useEffect, useRef } from 'react';
import { ErrorBoundary } from '@/utils/errorHandler';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Paper,
  Stack,
  useTheme,
  Alert,
  AlertTitle
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import BugReportIcon from '@mui/icons-material/BugReport';

const GlobalErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const errorHeadingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Focus the error heading when the component mounts
    if (errorHeadingRef.current) {
      errorHeadingRef.current.focus();
    }
  }, []);
  
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            bgcolor: 'background.default'
          }}
          role="alert"
          aria-live="assertive"
        >
          <Card
            sx={{
              maxWidth: 600,
              width: '100%',
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <CardContent>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  bgcolor: 'error.light',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3
                }}
              >
                <ErrorIcon sx={{ fontSize: 32, color: 'error.main' }} aria-hidden="true" />
              </Box>
              
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                fontWeight="bold" 
                color="error.main" 
                tabIndex={-1} 
                ref={errorHeadingRef}
              >
                Oops! Something went wrong
              </Typography>
              
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                <AlertTitle>Error Details</AlertTitle>
                <Typography variant="body2" component="p">
                  We&apos;ve logged this error and our team will look into it.
                </Typography>
              </Alert>
              
              <Typography variant="body1" color="text.secondary" paragraph>
                We&apos;re sorry, but an unexpected error has occurred. Our team has been notified.
              </Typography>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  mb: 3, 
                  textAlign: 'left',
                  bgcolor: 'action.hover'
                }}
              >
                <Typography 
                  variant="caption" 
                  component="p" 
                  sx={{ 
                    fontFamily: 'monospace',
                    wordBreak: 'break-word'
                  }}
                >
                  {error.message}
                </Typography>
              </Paper>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={reset}
                  startIcon={<BugReportIcon />}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    fontWeight: 'bold'
                  }}
                  aria-label="Try again to reload the page"
                >
                  Try Again
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => window.location.reload()}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    fontWeight: 'bold'
                  }}
                  aria-label="Reload the page"
                >
                  Reload Page
                </Button>
              </Stack>
              
              <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
                If the problem persists, please contact support with the error details above.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GlobalErrorBoundary;