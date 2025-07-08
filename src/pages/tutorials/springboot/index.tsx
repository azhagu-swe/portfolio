import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const SpringBootTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Spring Boot Essentials
      </Typography>
      <Typography variant="body1" paragraph>
        {`Spring Boot is a framework that makes it easy to create stand-alone,
        production-grade Spring-based applications that you can "just run." It
        simplifies building REST APIs and microservices.`}
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Auto-configuration:</strong> Spring Boot automatically
          configures your application based on the dependencies you have added.
        </li>
        <li>
          <strong>RESTful APIs:</strong> A standard way to build web services
          that allow different systems to communicate.
        </li>
        <li>
          <strong>Annotations:</strong> Special labels that add functionality to
          your code, like `@RestController` or `@GetMapping`.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (A REST Controller)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        {`This code creates a web endpoint. When a user sends a GET request to
        '/hello', the server will respond with the text "Hello, World!".`}
      </Typography>
    </Box>
  );
};

export default SpringBootTutorialPage;
