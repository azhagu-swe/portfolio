import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const TutorialCard = React.memo(({ title, description, icon, cta }: {title:any, description:any, icon:any, cta:any}) => {
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
});

// Add display name for debugging
TutorialCard.displayName = 'TutorialCard';

export default TutorialCard;
