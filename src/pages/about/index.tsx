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

const AboutMe: React.FC = () => {
  const theme = useTheme();
  const { basePath } = useRouter();
  const profile = PROFILE(basePath); // Call the function once to avoid repeated calls

  return (
    <Box
      sx={{
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(17, 226, 30, 0.34)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>
      {/* Introduction Section */}
      <Box textAlign="center">
        <Avatar
          src={profile.avatar}
          alt={profile.name}
          sx={{
            width: 120,
            height: 120,
            margin: "0 auto",
            mb: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
          component={motion.div}
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ duration: 0.4 }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#32CD32" }}>
          Hi, I&apos;m {profile.name} ☕
        </Typography>
        <Typography variant="h6" sx={{ fontStyle: "italic", mt: 1 }}>
          {profile.role}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {profile.intro}
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Skills Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", mb: 2 }}>
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

      {/* Certifications Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", mb: 2 }}>
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

      {/* Achievements Section */}
      <Box>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", mb: 2 }}>
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

      {/* Participation Section */}
      <Box>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", mb: 2 }}>
          Participation
        </Typography>
        <Grid container spacing={3}>
          {PARTICIPATIONS_DATA(basePath).map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomizeCard {...achievement} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutMe;
