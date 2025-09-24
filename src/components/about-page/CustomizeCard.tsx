import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

interface CustomizeCardProps {
  img: string;
  description: string;
}

const CustomizeCard = ({ img, description }: CustomizeCardProps) => (
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
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
    {/* Image Container with fixed aspect ratio */}
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 250,
        flexShrink: 0,
      }}>
      <Image
        src={img}
        alt={description}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center 5%",
        }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </Box>

    {/* Description Text */}
    <Box
      sx={{
        padding: "10px",
        backgroundColor: "primary.main",
        borderRadius: "0 0 12px 12px",
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          color: "white",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          textOverflow: "ellipsis",
        }}>
        {description}
      </Typography>
    </Box>
  </Box>
);

export default CustomizeCard;
