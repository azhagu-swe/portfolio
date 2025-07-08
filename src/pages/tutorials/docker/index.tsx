import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const DockerTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Docker Essentials</Typography>
      <Typography variant="body1" paragraph>
        Docker is a platform for developing, shipping, and running applications in containers. Containers package an application with all of its dependencies, ensuring it runs reliably in any computing environment.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Key Concepts</Typography>
      <ul>
        <li><strong>Image:</strong> A lightweight, stand-alone, executable package that includes everything needed to run a piece of software.</li>
        <li><strong>Container:</strong> A running instance of an image. You can have many containers running from the same image.</li>
        <li><strong>Dockerfile:</strong> A text file with instructions on how to build a Docker image.</li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>Simple Code Example (A Dockerfile)</Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <pre><code>
{`# Use an official Java runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR file into the container at /app
COPY target/my-app.jar my-app.jar

# Run the JAR file when the container launches
ENTRYPOINT ["java", "-jar", "my-app.jar"]`}
        </code></pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        This Dockerfile provides a simple recipe to package a compiled Java application into an image, which can then be run as a container on any machine with Docker installed.
      </Typography>
    </Box>
  );
};

export default DockerTutorialPage;