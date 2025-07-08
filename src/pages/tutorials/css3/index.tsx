import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const CssTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        CSS3 Styling
      </Typography>
      <Typography variant="body1" paragraph>
        CSS (Cascading Style Sheets) is the language used to style the
        appearance of a webpage. If HTML is the skeleton, CSS is the clothing—it
        adds all the colors, fonts, and layouts.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Selectors:</strong> Patterns used to select the HTML elements
          you want to style (e.g., `h1`, `.my-class`).
        </li>
        <li>
          <strong>Properties:</strong> The style you want to apply, like `color`
          or `font-size`.
        </li>
        <li>
          <strong>Values:</strong> The setting for the property, such as `blue`
          or `16px`.
        </li>
        <li>
          <strong>Box Model:</strong> The concept that every element is a
          rectangular box with margin, border, padding, and content.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`/* This code goes in a .css file */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}

h1 {
  color: #32CD32; /* Neon Green from your theme */
  text-align: center;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        {`This CSS code sets a background color for the page, changes the
        heading's color to your brand's neon green, and defines the size and
        spacing for paragraph text.`}
      </Typography>
    </Box>
  );
};

export default CssTutorialPage;
