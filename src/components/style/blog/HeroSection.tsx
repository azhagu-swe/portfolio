import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const HeroSection = () => {
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        color: theme.palette.text.primary,
      }}>
      {/* Animated Particles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}>
        {[...Array(50)].map((_, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              width: "4px",
              height: "4px",
              backgroundColor: theme.palette.secondary.main,
              borderRadius: "50%",
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: "transform 0.2s ease-out",
              animation: `float ${Math.random() * 3 + 1}s ease-in-out infinite`,
            }}
          />
        ))}
      </Box>

      {/* Hero Text */}
      <Typography variant="h1" sx={{ mb: 2, fontWeight: 700 }}>
        Innovating Code, Sharing Thoughts
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Explore my journey through programming, creativity, and innovation.
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
          "&:hover": {
            background: theme.palette.secondary.dark,
          },
        }}>
        Explore My Blogs
      </Button>
    </Box>
  );
};

export default HeroSection;
