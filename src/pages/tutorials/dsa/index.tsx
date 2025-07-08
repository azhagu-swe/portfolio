import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const DsaTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Data Structures & Algorithms
      </Typography>
      <Typography variant="body1" paragraph>
        Data Structures are ways of organizing and storing data, while
        Algorithms are steps for solving a problem or performing a calculation.
        Mastering DSA is crucial for writing efficient and scalable code.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Data Structures:</strong> Arrays, Linked Lists, Stacks,
          Queues, Trees, Hash Maps.
        </li>
        <li>
          <strong>Algorithms:</strong> Sorting (e.g., Bubble Sort, Merge Sort),
          Searching (e.g., Binary Search).
        </li>
        <li>
          <strong>Time & Space Complexity:</strong> A way to measure how
          efficient an algorithm is.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (HashMap in Java)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`import java.util.HashMap;

public class UserData {
    public static void main(String[] args) {
        // Create a HashMap to store user IDs and names
        HashMap<Integer, String> userMap = new HashMap<>();

        // Add key-value pairs
        userMap.put(101, "Alice");
        userMap.put(102, "Bob");

        // Retrieve a value by its key
        System.out.println("User 101 is: " + userMap.get(101)); // Prints "User 101 is: Alice"
    }
}`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        A HashMap is a powerful data structure that stores data in key-value
        pairs, allowing for very fast data retrieval.
      </Typography>
    </Box>
  );
};

export default DsaTutorialPage;
