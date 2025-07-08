import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const TypeScriptTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        TypeScript for React Devs
      </Typography>
      <Typography variant="body1" paragraph>
        TypeScript is a superset of JavaScript that adds static types. This
        allows you to catch errors during development before they happen in
        production, leading to more robust and maintainable code.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Static Typing:</strong> You define the type of your variables,
          function parameters, and return values (e.g., `string`, `number`,
          `boolean`).
        </li>
        <li>
          <strong>Interfaces:</strong> A way to define the shape of an object.
        </li>
        <li>
          <strong>Generics:</strong> A tool for creating reusable components
          that can work with a variety of types.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (Typed React Component)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`import React from 'react';

// Define the shape of the component's props
interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        This component expects a `prop` called `name` that must be a `string`.
        If you try to pass a number, TypeScript will show an error immediately,
        preventing a potential bug.
      </Typography>
    </Box>
  );
};

export default TypeScriptTutorialPage;
