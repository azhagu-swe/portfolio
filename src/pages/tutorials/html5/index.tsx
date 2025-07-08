import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const HtmlTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        HTML5 Fundamentals
      </Typography>
      <Typography variant="body1" paragraph>
        HTML (HyperText Markup Language) is the standard language used to create
        and design the structure of web pages. Think of it as the skeleton that
        gives every website its shape.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Elements:</strong> Building blocks of HTML, like headings,
          paragraphs, or images.
        </li>
        <li>
          <strong>Tags:</strong> Labels you use to create elements, written with
          angle brackets like `&lt;p&gt;`.
        </li>
        <li>
          <strong>Attributes:</strong> Provide extra information about an
          element, like a source for an image (`src`).
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
  <a href="https://www.google.com">Go to Google</a>
</body>
</html>`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        This basic structure defines a webpage with a title, a main heading, a
        paragraph of text, and a link. Every webpage you visit is built upon
        these fundamental principles.
      </Typography>
    </Box>
  );
};

export default HtmlTutorialPage;
