import React from 'react';
import Head from 'next/head';
import { Button, Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

const OfflinePage = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.reload();
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
      <Head>
        <title>Offline - Azhagu's Portfolio</title>
      </Head>
      
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          😴
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          You are offline
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          It seems you're not connected to the internet. But don't worry, you can still browse the content you've visited before.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleRefresh}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    </Container>
  );
};

export default OfflinePage;