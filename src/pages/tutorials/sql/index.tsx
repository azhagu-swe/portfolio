import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const SqlTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        SQL Fundamentals
      </Typography>
      <Typography variant="body1" paragraph>
        SQL (Structured Query Language) is the standard language for managing
        and manipulating data in relational databases. It allows you to create,
        read, update, and delete data.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>SELECT:</strong> Retrieves data from a database.
        </li>
        <li>
          <strong>INSERT INTO:</strong> Inserts new data into a database.
        </li>
        <li>
          <strong>UPDATE:</strong> Modifies data already in a database.
        </li>
        <li>
          <strong>DELETE:</strong> Deletes data from a database.
        </li>
        <li>
          <strong>JOIN:</strong> Combines rows from two or more tables based on
          a related column.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (A Query)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`-- Selects the names of all users from the 'Users' table who are from India
SELECT name
FROM Users
WHERE country = 'India';`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        This simple query is a powerful example of how SQL can be used to filter
        through vast amounts of data to find exactly what you need.
      </Typography>
    </Box>
  );
};

export default SqlTutorialPage;
