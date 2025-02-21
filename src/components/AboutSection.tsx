import React from 'react';
import { Box, Typography } from '@mui/material';

const AboutSection: React.FC = () => {
  return (
    <Box sx={{ padding: '40px 0', textAlign: 'center' }}>
      <Typography variant="h3" component="h3" gutterBottom>
        About Me
      </Typography>
      <Typography paragraph>
        With 2 years of experience in the software development industry, I specialize in creating efficient and scalable
        web applications. My passion for technology drives me to continuously learn and adapt to new challenges.
      </Typography>
    </Box>
  );
};

export default AboutSection;
