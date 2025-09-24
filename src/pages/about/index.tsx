import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Avatar,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import CustomizeCard from "@/components/about-page/CustomizeCard";
import SkillCard from "@/components/about-page/SkillCard";
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
  const router = useRouter();
  const { basePath } = router;
  const profile = PROFILE(basePath);

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: "15px",
        boxShadow: `0 8px 30px ${theme.palette.primary.light}33`,
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: theme.palette.background.paper,
        width: "100%",
      }}>
      <Grid
        container
        spacing={{ xs: 3, sm: 4, md: 5 }}
        alignItems="center"
        sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h4"
            component={motion.h1}
            variants={itemVariants}
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            }}>
            Hi, I&apos;m {profile.name}
          </Typography>
          <Typography
            variant="h6"
            component={motion.h2}
            variants={itemVariants}
            sx={{
              fontStyle: "italic",
              mt: 1,
              color: "text.secondary",
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
            }}>
            {profile.role}
          </Typography>
          <Typography
            variant="body1"
            component={motion.p}
            variants={itemVariants}
            sx={{
              mt: 2,
              textAlign: { xs: "justify", md: "justify" },
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
              lineHeight: 1.7,
            }}>
            {profile.intro}
          </Typography>
        </Grid>
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
              width: { xs: 100, sm: 120, md: 180 },
              height: { xs: 100, sm: 120, md: 180 },
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 20px ${theme.palette.primary.light}`,
              "& img": {
                objectFit: "cover",
                objectPosition: "center 20%",
              },
            }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: { xs: 3, sm: 4, md: 5 } }} />

      <Box
        sx={{ mb: { xs: 3, sm: 4, md: 5 } }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
          }}>
          Technical Skills
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {SKILLS_DATA.map((skill, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <SkillCard title={skill.title} skills={skill.skills} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: { xs: 3, sm: 4, md: 5 } }} />

      <Box
        sx={{ mb: { xs: 3, sm: 4, md: 5 } }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
          }}>
          Certifications
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {CERTIFICATIONS_DATA(basePath).map((cert, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomizeCard {...cert} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: { xs: 3, sm: 4, md: 5 } }} />

      <Box
        sx={{ mb: { xs: 3, sm: 4, md: 5 } }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
          }}>
          Achievements
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {ACHIEVEMENTS_DATA(basePath).map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomizeCard {...achievement} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: { xs: 3, sm: 4, md: 5 } }} />

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
          }}>
          Participation
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {PARTICIPATIONS_DATA(basePath).map((participation, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomizeCard {...participation} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* New Section: AI Development Tools */}
      <Divider sx={{ my: { xs: 3, sm: 4, md: 5 } }} />

      <Box component={motion.div} variants={itemVariants}>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            fontWeight: "bold",
            mb: { xs: 2, sm: 3 },
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
          }}>
          AI Development Tools
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-8px)" },
                  boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
                },
              }}>
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: theme.palette.primary.main,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}>
                  Qwen CLI
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}>
                  Leveraging Alibaba Cloud&#39;s Qwen CLI for AI-powered code
                  generation, optimization, and development assistance.
                  Enhancing productivity through intelligent code suggestions
                  and automated refactoring.
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography
                    component="li"
                    variant="body2"
                    sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    Code generation and refactoring assistance
                  </Typography>
                  <Typography
                    component="li"
                    variant="body2"
                    sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    Automated documentation generation
                  </Typography>
                  <Typography
                    component="li"
                    variant="body2"
                    sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    Intelligent debugging and error resolution
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-8px)" },
                  boxShadow: `0 15px 30px ${theme.palette.secondary.main}55`,
                },
              }}>
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: theme.palette.secondary.main,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}>
                  Google Gemini CLI
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}>
                  Utilizing Google&#39;s Gemini CLI for advanced AI-assisted
                  development workflows. Integrating cutting-edge AI
                  capabilities into the development process for enhanced
                  problem-solving and innovation.
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography
                    component="li"
                    variant="body2"
                    sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    Natural language to code conversion
                  </Typography>
                  <Typography
                    component="li"
                    variant="body2"
                    sx={{ mb: 1, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    Complex problem-solving with AI guidance
                  </Typography>
                  <Typography
                    component="li"
                    variant="body2"
                    sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
                    Multi-modal development assistance
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutMe;
