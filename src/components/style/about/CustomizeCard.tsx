import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import exp from "constants";

const CustomizeCard = ({ img, description }: { img: string; description: string }) => (
  <Box
    component={motion.div}
    initial="hidden"
    whileInView="visible"
    whileHover={{
      scale: 1.05,
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
    }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    sx={{
      textAlign: "center",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      borderRadius: "12px",
      overflow: "hidden",
      width: "100%",
      height: "100%", // Parent container should control height
      display: "flex",
      flexDirection: "column",
      // Fixed height for all cards
      minHeight: 320, // Adjust this value as needed
      maxHeight: 300,
    }}
  >
    {/* Image Container with fixed aspect ratio */}
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 250, 
        flexShrink: 0, // Prevent image container from shrinking
      }}
    >
      <Image
        src={img}
        alt={description}
        fill
        style={{
          objectFit: "cover",
        }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </Box>
    {/* Space between image and text */}
    <Box sx={{ marginBottom: 1 }} /> {/* Add space here */}
    {/* Description Text */}
    <Typography
      variant="body2"
      sx={{
        fontWeight: "bold",
        padding: "10px",
        backgroundColor: "primary.main",
        color: "white",
        height: 120, // Fixed height for text container
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Text truncation for multi-line text
        overflow: "hidden",
        textOverflow: "ellipsis",
        // display: "-webkit-box",
        WebkitLineClamp: 3, // Show max 3 lines
        WebkitBoxOrient: "vertical",
        borderRadius: "0 0 12px 12px",
      }}
    >
      {description}
    </Typography>
  </Box>
);
export default CustomizeCard;