import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ComingSoon = () => {
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
        🚧 Page Under Construction 🚧
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Just like coding, great things take time. Stay tuned while I debug and
        deploy something amazing! 🚀
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

export default ComingSoon;
