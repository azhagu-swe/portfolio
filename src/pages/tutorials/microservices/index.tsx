import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const MicroservicesTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Microservices Architecture
      </Typography>
      <Typography variant="body1" paragraph>
        Microservices is an architectural style that structures an application
        as a collection of small, independent, and loosely coupled services.
        Each service is self-contained and can be developed, deployed, and
        scaled independently.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Independence:</strong> Each service can be deployed and
          updated without affecting others.
        </li>
        <li>
          <strong>Decentralization:</strong> Each service can use its own
          database and technology stack.
        </li>
        <li>
          <strong>API Gateway:</strong> A single entry point for all clients,
          routing requests to the appropriate microservice.
        </li>
        <li>
          <strong>Service Discovery:</strong> A mechanism for services to find
          and communicate with each other.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Analogy
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <Typography variant="body2" component="div">
          <p>
            <strong>Monolith (Old Way):</strong> Imagine a large, all-in-one
            restaurant where the kitchen, billing, and seating are all one
            giant, interconnected department. If one part fails, the whole
            restaurant shuts down.
          </p>
          <p>
            <strong>Microservices (New Way):</strong> Imagine a food court. Each
            stall (service) is independent—one for pizza, one for tacos, one for
            drinks. If the pizza stall closes, you can still get tacos and
            drinks. They work together but are managed separately.
          </p>
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        This approach allows large, complex applications to be more manageable,
        flexible, and resilient.
      </Typography>
    </Box>
  );
};

export default MicroservicesTutorialPage;
