import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Terminal from '@/components/ui/Terminal';
import { motion } from 'framer-motion';
import Head from 'next/head';

const TerminalPage = () => {
  return (
    <>
      <Head>
        <title>Interactive Terminal | Azhagu-swe Portfolio</title>
        <meta name="description" content="Interactive terminal showcasing code and technical skills" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Interactive Terminal
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Type commands to explore my technical skills
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Terminal 
            initialLines={[
              '// Welcome to Azhagu SWE\'s Portfolio Terminal',
              '// Type "help" to see available commands',
              ''
            ]}
            welcomeMessage="Type 'help' to see available commands"
            showCursor={true}
          />
        </motion.div>
      </Container>
    </>
  );
};

export default TerminalPage;