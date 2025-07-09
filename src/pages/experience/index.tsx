import React from "react";
import { Box, Typography, Chip, Paper, useTheme, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { EXPERIENCE_DATA } from "@/utils/experienceData";
import WorkIcon from "@mui/icons-material/Work";

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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ExperiencePage = () => {
  const theme = useTheme();

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
      <Box
        sx={{ textAlign: "center", mb: 6 }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
          {EXPERIENCE_DATA.header.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
          {EXPERIENCE_DATA.header.subtitle}
        </Typography>
      </Box>

      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            left: { xs: "20px", md: "28px" },
            top: 0,
            bottom: 0,
            width: "4px",
            bgcolor: theme.palette.divider,
            borderRadius: "2px",
          }}
        />

        {EXPERIENCE_DATA.roles.map((role, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}>
            <Box
              sx={{
                display: "flex",
                position: "relative",
                mb: 4,
                "&:last-child": { mb: 0 },
              }}>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: "44px", md: "60px" },
                  height: { xs: "44px", md: "60px" },
                  borderRadius: "50%",
                  bgcolor: theme.palette.primary.main,
                  border: `4px solid ${theme.palette.background.paper}`,
                  zIndex: 1,
                  color: theme.palette.primary.contrastText,
                }}>
                <WorkIcon />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  flexGrow: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "16px",
                  ml: { xs: "60px", md: "88px" },
                  transition: "box-shadow 0.3s, border-color 0.3s",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 20px ${theme.palette.primary.light}55`,
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

      <Box sx={{ mt: 6 }} component={motion.div} variants={itemVariants}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "text.primary",
            textAlign: "center",
          }}>
          Key Achievements
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "16px",
          }}>
          <Typography component="ul" sx={{ pl: 2, textAlign: "justify" }}>
            {EXPERIENCE_DATA.achievements.map((achievement, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: achievement }}
                style={{ marginBottom: "8px" }}
              />
            ))}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }} component={motion.div} variants={itemVariants}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "text.primary",
            textAlign: "center",
          }}>
          Skills Gained
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "16px",
          }}>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            justifyContent="center">
            {EXPERIENCE_DATA.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                variant="outlined"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default ExperiencePage;
