import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 2000 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        zIndex: 9999,
        transition: 'opacity 0.5s ease',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            fontFamily: 'Orbitron, sans-serif',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Azhagu-swe
        </Typography>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            mt: 1,
            fontSize: { xs: '1rem', sm: '1.2rem' }
          }}
        >
          Crafting Digital Experiences
        </Typography>
      </motion.div>
      
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
        sx={{ mt: 3, width: '100%', maxWidth: 200 }}
      >
        <Box
          sx={{
            height: '4px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            animate={{ 
              background: [
                theme.palette.primary.main,
                theme.palette.secondary.main,
                theme.palette.primary.main
              ] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default SplashScreen;