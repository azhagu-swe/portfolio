import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Terminal from '@/components/ui/Terminal';
import { motion } from 'framer-motion';
import Head from 'next/head';

const TerminalPage = () => {
  return (
    <>
      <Head>
        <title>Terminal | Azhagu-swe Portfolio</title>
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
              Explore my technical skills through code
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Terminal 
            codeLines={[
              '// Software Engineer Portfolio',
              'const profile = {',
              '  name: "Azhagu SWE",',
              '  role: "Software Engineer",',
              '  skills: ["Java", "Spring Boot", "React", "Microservices"],',
              '  experience: "3+ years",',
              '  location: "Chennai, India",',
              '};',
              '',
              '// Core Technologies',
              'const technologies = {',
              '  backend: ["Java", "Spring Boot", "Spring Security", "Hibernate"],',
              '  frontend: ["React", "Next.js", "TypeScript", "Material UI"],',
              '  databases: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],',
              '  devops: ["Docker", "AWS", "CI/CD", "Kubernetes"],',
              '};',
              '',
              '// Sample Implementation',
              'function createMicroservice() {',
              '  return new SpringBootApplication({',
              '    dependencies: ["Web", "Data JPA", "Security"],',
              '    config: { port: 8080 },',
              '    features: ["REST APIs", "JWT Auth", "Data Persistence"]',
              '  });',
              '}',
              '',
              'console.log("Welcome to my portfolio!");',
              'console.log("Connect with me: azhagu.swe@gmail.com");'
            ]}
            typingSpeed={20}
            pauseDuration={1000}
            showCursor={true}
          />
        </motion.div>
      </Container>
    </>
  );
};

export default TerminalPage;