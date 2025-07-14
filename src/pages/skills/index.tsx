import React from "react";
import { Box, Typography, Grid, Paper, Chip, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { SKILLS_DATA } from "@/utils/skillData";
import Link from "next/link";

interface Skill {
  name: string;
  icon: string;
  level: string;
  tutorialSlug?: string;
}

interface SkillCardProps {
  skill: Skill;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

const SkillCard = ({ skill }: SkillCardProps) => {
  const theme = useTheme();

  const cardContent = (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        textAlign: "center",
        height: "100%",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        borderColor: "divider",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.02)",
        backdropFilter: "blur(10px)",
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
          margin: "0 auto",
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
        {skill.name}
      </Typography>
      <Chip
        label={skill.level}
        color="primary"
        variant="outlined"
        sx={{ mb: skill.tutorialSlug ? 1 : 0 }}
      />
      {/* {skill.tutorialSlug && (
        <Chip
          label="View Tutorial"
          color="secondary"
          size="small"
          sx={{ mt: 1, cursor: "pointer" }}
        />
      )} */}
    </Paper>
  );

  if (skill.tutorialSlug) {
    return (
      <Link
        href={`/tutorials/${skill.tutorialSlug}`}
        passHref
        style={{ textDecoration: "none", height: "100%" }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

const SkillsPage = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1200px", mx: "auto" }}>
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
        {SKILLS_DATA.skills.map((skill: Skill, index: number) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            component={motion.div}
            variants={itemVariants}>
            <SkillCard skill={skill} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsPage;
