import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: theme.palette.text.primary,
        padding: 4,
      }}>
      <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold" }}>
        404: Page Not Found 🤔
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Oops! Looks like you wandered into the void. But hey, even the best
        coders hit a dead end sometimes!
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic", mb: 4 }}>
        If at first you don’t succeed, try debugging.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          px: 4,
          py: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
        href="/">
        Take Me Home
      </Button>
    </Box>
  );
};

export default NotFound;
