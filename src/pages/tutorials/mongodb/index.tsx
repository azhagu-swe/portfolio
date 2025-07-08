import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const MongoDbTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        MongoDB for Beginners
      </Typography>
      <Typography variant="body1" paragraph>
        {`MongoDB is a popular NoSQL database that stores data in flexible,
        JSON-like documents. This makes it easy to store and query data that
        doesn't fit neatly into traditional rows and columns.`}
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Documents:</strong> Data is stored in BSON (a binary version
          of JSON) documents, which are similar to objects.
        </li>
        <li>
          <strong>Collections:</strong> Documents are stored in collections,
          which are like tables in a SQL database.
        </li>
        <li>
          <strong>No Schema:</strong> Documents in the same collection do not
          need to have the same set of fields or structure.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (A Document)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`// A sample document in a 'users' collection
{
  "_id": "some_unique_id",
  "name": "Suresh",
  "age": 28,
  "city": "Chennai",
  "skills": ["Java", "React", "SQL"]
}`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        This document structure is flexible, allowing for complex data like
        arrays (`skills`) to be stored naturally within a single record.
      </Typography>
    </Box>
  );
};

export default MongoDbTutorialPage;
