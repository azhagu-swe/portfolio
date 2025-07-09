import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { SKILLS_DATA } from "@/utils/skillData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const SkillsPage = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 } }}>
      <Box
        sx={{ textAlign: "center", mb: 6 }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: "Orbitron, sans-serif",
          }}>
          {SKILLS_DATA.header.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {SKILLS_DATA.header.subtitle}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {SKILLS_DATA.skills.map((skill, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            component={motion.div}
            variants={itemVariants}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                borderRadius: "16px",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                borderColor: "divider",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 10px 20px ${theme.palette.primary.light}44`,
                },
              }}>
              <Icon
                icon={skill.icon}
                style={{
                  width: 50,
                  height: 50,
                  color: theme.palette.primary.main,
                  marginBottom: theme.spacing(2),
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {skill.name}
              </Typography>
              <Chip label={skill.level} color="primary" variant="outlined" />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsPage;
