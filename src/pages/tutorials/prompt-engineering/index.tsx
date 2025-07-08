import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const PromptEngineeringTutorialPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Prompt Engineering Basics
      </Typography>
      <Typography variant="body1" paragraph>
        Prompt Engineering is the art and science of crafting effective inputs
        (prompts) for Large Language Models (LLMs) like Gemini to get the most
        accurate, relevant, and useful outputs.
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Key Concepts
      </Typography>
      <ul>
        <li>
          <strong>Clarity and Specificity:</strong> Be as clear and detailed as
          possible. Ambiguous prompts lead to generic answers.
        </li>
        <li>
          <strong>Context:</strong> Provide background information or context to
          guide the model.
        </li>
        <li>
          <strong>Role-Playing:</strong> Instruct the model to act as a specific
          persona (e.g., Act as a senior software developer...).
        </li>
        <li>
          <strong>Few-Shot Prompting:</strong> Give the model a few examples of
          the input-output format you want it to follow.
        </li>
      </ul>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Simple Code Example (A Good vs. Bad Prompt)
      </Typography>
      <Paper elevation={3} sx={{ p: 2, backgroundColor: "background.paper" }}>
        <Typography variant="body2" component="div">
          <p>
            <strong>Bad Prompt:</strong> Explain Docker.
          </p>
          <p>
            <strong>Good Prompt:</strong> Explain Docker in simple terms for a
            non-technical project manager. Use an analogy to describe the
            difference between an image and a container.
          </p>
        </Typography>
      </Paper>

      <Typography variant="body1" paragraph sx={{ mt: 3 }}>
        The good prompt provides a clear audience (non-technical PM), sets a
        tone (simple terms), and gives a specific instruction (use an analogy),
        which will result in a much more useful response.
      </Typography>
    </Box>
  );
};

export default PromptEngineeringTutorialPage;
