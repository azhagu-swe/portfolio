import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const ReactTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        React.js Basics
      </Typography>
      <Typography variant="body1" paragraph>
        {` React is a JavaScript library for building user interfaces. It lets you create reusable UI pieces called "components" and efficiently updates the view when your data changes.`}
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Components:</strong> Reusable, independent bits of UI. A
          button, a form, or an entire page can be a component.
        </li>
        <li>
          <strong>JSX:</strong> A syntax extension for JavaScript that looks
          like HTML and is used to describe what the UI should look like.
        </li>
        <li>
          <strong>State:</strong> Data that a component owns and can change over
          time. When state changes, React re-renders the component.
        </li>
        <li>
          <strong>Props:</strong> Data passed from a parent component down to a
          child component.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`import React, { useState } from 'react';

function Counter() {
  // 'count' is a state variable, initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        {`This React component defines a "Counter." It has a state variable 'count' and a button. When the button is clicked, the 'setCount' function updates the state, and React automatically updates the text on the page to show the new count.`}
      </Typography>
    </Box>
  );
};

export default ReactTutorialPage;
