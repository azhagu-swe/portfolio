import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const GitTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Git & GitHub
      </Typography>
      <Typography variant="body1" paragraph>
        Git is a version control system that tracks changes to your code. GitHub
        is a web platform that hosts your Git repositories, allowing you to
        collaborate with others and store your code remotely.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Repository (Repo):</strong> A folder containing your project
          and its entire history of changes.
        </li>
        <li>
          <strong>Commit:</strong> A snapshot of your repository at a specific
          point in time.
        </li>
        <li>
          <strong>Branch:</strong> An independent line of development, allowing
          you to work on new features without affecting the main codebase.
        </li>
        <li>
          <strong>Push & Pull:</strong> Pushing sends your commits to a remote
          repository (like GitHub), and pulling fetches changes from it.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (Basic Workflow)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <pre>
          <code>
            {`# Add all changed files to be tracked
git add .

# Save the changes with a descriptive message
git commit -m "Add new feature for user login"

# Send the changes to your remote repository on GitHub
git push origin main`}
          </code>
        </pre>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        {`This three-step process—add, commit, push—is the most common workflow you'll use to save and share your work with Git and GitHub.`}
      </Typography>
    </Box>
  );
};

export default GitTutorialPage;
