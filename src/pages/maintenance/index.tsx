import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Maintenance = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: 
        "center",
        alignItems: "center",
        textAlign: "center",
        color: theme.palette.text.primary,
        padding: 4,
      }}>
      <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold" }}>
        🛠️ We’ll Be Right Back! 🛠️
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        {`      I'm upgrading the site with some powerful new features. Think of it as refactoring in progress! 💻
`}
      </Typography>
      <Typography variant="body2" sx={{ fontStyle: "italic", mb: 4 }}>
        Good code, like good coffee, takes a little extra time.
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
        Notify Me When Ready
      </Button>
    </Box>
  );
};

export default Maintenance;
