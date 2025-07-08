import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const JavaScriptTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        JavaScript Essentials
      </Typography>
      <Typography variant="body1" paragraph>
        JavaScript (JS) is a programming language that allows you to add
        interactivity to your websites. It can change HTML content, react to
        user actions like clicks, and much more.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Variables:</strong> Containers for storing data values (`let`,
          `const`).
        </li>
        <li>
          <strong>Functions:</strong> Blocks of code designed to perform a
          particular task.
        </li>
        <li>
          <strong>DOM Manipulation:</strong> Changing the structure, style, or
          content of a document.
        </li>
        <li>
          <strong>Events:</strong> Actions that happen in the browser, like a
          button click or a page finishing its load.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`// HTML needed: <button id="myButton">Click Me</button>

const myButton = document.getElementById('myButton');

myButton.addEventListener('click', () => {
  alert('Button was clicked!');
});`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        {`This code finds a button on the page and "listens" for a click event. When the button is clicked, it executes the function to show an alert message.`}
      </Typography>
    </Box>
  );
};

export default JavaScriptTutorialPage;
