import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Avatar,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import CustomizeCard from "@/components/style/about/CustomizeCard";
import SkillCard from "@/components/style/about/SkillCard";
import {
  PROFILE,
  SKILLS_DATA,
  CERTIFICATIONS_DATA,
  ACHIEVEMENTS_DATA,
  PARTICIPATIONS_DATA,
} from "@/utils/aboutData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const AboutMe: React.FC = () => {
  const theme = useTheme();
  const { basePath } = useRouter();
  const profile = PROFILE(basePath);

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        padding: { xs: 2, sm: 4 }, 
        borderRadius: "15px",
        boxShadow: `0 8px 30px ${theme.palette.primary.light}33`,
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: theme.palette.background.paper,
      }}>
      <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
        <Grid
          item
          xs={12}
          md={4}
          component={motion.div}
          variants={itemVariants}
          sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={profile.avatar}
            alt={profile.name}
            sx={{
              width: { xs: 120, md: 180 },
              height: { xs: 120, md: 180 },
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 20px ${theme.palette.primary.light}`,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h4"
            component={motion.h1}
            variants={itemVariants}
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
            Hi, I&apos;m {profile.name} 
          </Typography>
          <Typography
            variant="h6"
            component={motion.h2}
            variants={itemVariants}
            sx={{ fontStyle: "italic", mt: 1, color: "text.secondary" }}>
            {profile.role}
          </Typography>
          <Typography
            variant="body1"
            component={motion.p}
            variants={itemVariants}
            sx={{ mt: 2, textAlign: "justify" }}
          >
            {profile.intro}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 4 }} component={motion.div} variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Technical Skills
        </Typography>
        <Grid container spacing={3}>
          {SKILLS_DATA.map((skill, index) => (
            <Grid item xs={12} md={6} key={index}>
              <SkillCard title={skill.title} skills={skill.skills} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 4 }} component={motion.div} variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Certifications
        </Typography>
        <Grid container spacing={3}>
          {CERTIFICATIONS_DATA(basePath).map((cert, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomizeCard {...cert} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mb: 4 }} component={motion.div} variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Achievements
        </Typography>
        <Grid container spacing={3}>
          {ACHIEVEMENTS_DATA(basePath).map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomizeCard {...achievement} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box component={motion.div} variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Participation
        </Typography>
        <Grid container spacing={3}>
          {PARTICIPATIONS_DATA(basePath).map((participation, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomizeCard {...participation} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutMe;
