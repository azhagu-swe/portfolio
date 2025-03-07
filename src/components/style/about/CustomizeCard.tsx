import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

const CustomizeCard = ({
  img,
  description,
}: {
  img: string;
  description: string;
}) => (
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
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
    {/* Image Container */}
    <Box
      sx={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // 16:9 aspect ratio
      }}>
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
        minHeight: 60, // Fixed minimum height for text container
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {description}
    </Typography>
  </Box>
);

export default CustomizeCard;
