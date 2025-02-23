import React from "react";
import { Card, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const TutorialCard = ({ title, description, icon, cta }:{title:any, description:any, icon:any, cta:any  }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ margin: "20px", cursor: "pointer" }}
    >
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
        <CardMedia
          component="div"
          sx={{
            height: 150,
            background: "linear-gradient(135deg, #3f51b5, #2196f3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Icon icon={icon} width="60" height="60" />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box mt={2} textAlign="center">
            <Button variant="contained" size="small" href={cta.link}>
              {cta.text}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TutorialCard;
