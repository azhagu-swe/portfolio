import React from "react";
import {
  Box,
  Typography,
  Chip,
  Paper,
  useTheme,
  Stack,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { EXPERIENCE_DATA } from "@/utils/experienceData";
import WorkIcon from "@mui/icons-material/Work";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// --- MAIN COMPONENT ---
const ExperiencePage = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1200px", mx: "auto" }}>
      {/* --- HEADER --- */}
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
          {EXPERIENCE_DATA.header.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
          {EXPERIENCE_DATA.header.subtitle}
        </Typography>
      </Box>

      {/* --- TIMELINE SECTION --- */}
      <Box sx={{ position: "relative" }}>
        {/* The vertical line of the timeline */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "18px", md: "28px" },
            top: 0,
            bottom: 0,
            width: "4px",
            bgcolor: theme.palette.divider,
            borderRadius: "2px",
          }}
        />

        {EXPERIENCE_DATA.roles.map((role, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                mb: 4,
                "&:last-child": { mb: 0 },
              }}>
              {/* The glowing icon on the timeline */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: "12px",
                  zIndex: 1,
                }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: "40px", md: "60px" },
                    height: { xs: "40px", md: "60px" },
                    borderRadius: "50%",
                    bgcolor: theme.palette.primary.main,
                    border: `4px solid ${theme.palette.background.paper}`,
                    color: theme.palette.primary.contrastText,
                    boxShadow: `0 0 15px ${theme.palette.primary.main}`,
                  }}>
                  <WorkIcon />
                </Box>
              </motion.div>

              {/* The main content card for the role */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  flexGrow: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "16px",
                  ml: { xs: "56px", md: "88px" },
                  transition: "box-shadow 0.3s, border-color 0.3s",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 25px ${theme.palette.primary.light}55`,
                  },
                }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {role.company}
                </Typography>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  {role.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}>
                  {role.duration} | {role.location}
                </Typography>
                <Typography
                  variant="body1"
                  component="ul"
                  sx={{ pl: 2, textAlign: "justify" }}>
                  {role.responsibilities.map((responsibility, i) => (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{ __html: responsibility }}
                      style={{ marginBottom: "8px" }}
                    />
                  ))}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}>
                    Tech Stack:
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {role.techStack.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* --- KEY ACHIEVEMENTS SECTION --- */}
      <Box sx={{ mt: 8 }} component={motion.div} variants={itemVariants}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: theme.palette.primary.main,
            textAlign: "center",
            fontFamily: "Orbitron, sans-serif",
          }}>
          Key Achievements
        </Typography>
        {/* UPDATED: The Grid now renders the new list of achievements */}
        <Grid container spacing={2}>
          {EXPERIENCE_DATA.achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div whileHover={{ y: -5 }} style={{ height: "100%" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: "100%",
                    borderRadius: "16px",
                    border: `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}>
                  <Typography variant="h4">
                    {achievement.substring(0, 2)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    dangerouslySetInnerHTML={{
                      __html: achievement.substring(2),
                    }}
                  />
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ExperiencePage;
