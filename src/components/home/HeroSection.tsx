import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/router";
import { HERO_DATA } from "@/utils/heroData";
import { HERO_ANIMATION_CONFIG } from "@/utils/animationConfig";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;

  // Memoize the image URL to prevent unnecessary re-renders
  const profileImageUrl = useMemo(() => {
    return `${basePath}${HERO_DATA.images.profile}`;
  }, [basePath]);

  const handleHireMe = () => {
    router.push("/contact");
  };

  const handleDownloadResume = () => {
    window.open(`${basePath}${HERO_DATA.images.resume}`, "_blank");
  };

  return (
    <Box 
      sx={{ 
        minHeight: { xs: "auto", sm: "auto", md: "90vh" },
        display: "flex",
        alignItems: "center",
        py: { xs: 4, sm: 6, md: 8 }
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, sm: 6, md: 8 }}
        alignItems="center"
        justifyContent="center"
        sx={{ 
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, lg: 4 }
        }}>
        {/* Text Content */}
        <Grid
          item
          xs={12}
          md={7}
          sx={{ 
            textAlign: { xs: "center", md: "left" },
            order: { xs: 2, md: 1 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
          <motion.div
            variants={HERO_ANIMATION_CONFIG.textContainer}
            initial="hidden"
            animate="show">
            <Typography
              component={motion.h1}
              variant="h1"
              gutterBottom
              variants={HERO_ANIMATION_CONFIG.item}
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
                fontWeight: 800,
                lineHeight: 1.2,
                mb: { xs: 1, sm: 2 }
              }}>
              Hi, I&apos;m{" "}
              <span style={{ 
                color: theme.palette.primary.main,
                position: "relative"
              }}>
                {HERO_DATA.name}
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: { xs: -4, sm: -6 },
                    left: 0,
                    width: "100%",
                    height: { xs: "4px", sm: "6px" },
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    borderRadius: "2px",
                    opacity: 0.5
                  }}
                />
              </span>
            </Typography>

            <Typography
              component={motion.h2}
              variant="h2"
              gutterBottom
              color="text.primary"
              variants={HERO_ANIMATION_CONFIG.item}
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem", lg: "2.2rem" },
                fontWeight: 700,
                minHeight: { xs: 60, sm: 70, md: 80 },
                mb: { xs: 2, sm: 3 },
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" }
              }}>
              <Typewriter
                words={HERO_DATA.roles}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </Typography>

            <Typography
              component={motion.p}
              variant="h6"
              color="text.secondary"
              variants={HERO_ANIMATION_CONFIG.item}
              sx={{ 
                mt: { xs: 1, sm: 2 },
                lineHeight: 1.6,
                maxWidth: { md: "90%" },
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.25rem" },
                textAlign: { xs: "center", md: "left" }
              }}>
              {HERO_DATA.description}
            </Typography>

            {/* Skills/Tags */}
            <motion.div variants={HERO_ANIMATION_CONFIG.item}>
              <Stack 
                direction="row" 
                spacing={{ xs: 0.5, sm: 1 }}
                useFlexGap
                flexWrap="wrap"
                sx={{ 
                  mt: { xs: 2, sm: 3, md: 4 },
                  mb: { xs: 2, sm: 3 },
                  justifyContent: { xs: "center", md: "flex-start" }
                }}
              >
                <Chip 
                  label="Java" 
                  size="small" 
                  sx={{ 
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 600,
                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    height: { xs: 24, sm: 28, md: 32 }
                  }} 
                />
                <Chip 
                  label="Spring Boot" 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    height: { xs: 24, sm: 28, md: 32 }
                  }} 
                />
                <Chip 
                  label="React" 
                  size="small"
                  sx={{ 
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 600,
                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    height: { xs: 24, sm: 28, md: 32 }
                  }} 
                />
                <Chip 
                  label="Microservices" 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    height: { xs: 24, sm: 28, md: 32 }
                  }} 
                />
              </Stack>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={HERO_ANIMATION_CONFIG.item}>
              <Box
                sx={{
                  mt: { xs: 2, sm: 3 },
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1.5, sm: 2 },
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: { xs: "center", sm: "flex-start" }
                }}>
                <Button
              variant="contained"
              size="large"
              onClick={handleHireMe}
              sx={{ 
                px: { xs: 3, sm: 4, md: 6 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 600,
                borderRadius: "50px",
                boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                "&:hover": { 
                  transform: "translateY(-3px)",
                  boxShadow: `0 6px 25px ${theme.palette.primary.main}60`
                },
                transition: "all 0.3s ease",
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: 280, sm: "none" }
              }}
              role="button"
              aria-label="Contact me for hiring opportunities"
              tabIndex={0}
            >
              {HERO_DATA.buttons.hire}
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleDownloadResume}
              sx={{ 
                px: { xs: 3, sm: 4, md: 6 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 600,
                borderRadius: "50px",
                borderWidth: "2px",
                "&:hover": { 
                  transform: "translateY(-3px)",
                  borderWidth: "2px"
                },
                transition: "all 0.3s ease",
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: 280, sm: "none" }
              }}
              role="button"
              aria-label="Download my resume"
              tabIndex={0}
            >
              {HERO_DATA.buttons.resume}
            </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Grid>

        {/* Profile Image */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            order: { xs: 1, md: 2 },
            mb: { xs: 2, sm: 3, md: 0 }
          }}>
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={HERO_ANIMATION_CONFIG.image}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 200, sm: 250, md: 300, lg: 350 },
                height: { xs: 200, sm: 250, md: 300, lg: 350 },
                borderRadius: "50%",
                border: `4px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 30px ${theme.palette.primary.light}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: "150%",
                  height: "150%",
                  background: `conic-gradient(
                    transparent,
                    ${theme.palette.primary.main},
                    transparent
                  )`,
                  animation: "rotate 4s linear infinite",
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  inset: "4px",
                  borderRadius: "50%",
                  background: theme.palette.background.paper,
                },
                "@keyframes rotate": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" }
                }
              }}>
              <Box sx={{ 
                position: "relative", 
                width: "95%", 
                height: "95%", 
                borderRadius: "50%",
                overflow: "hidden",
                zIndex: 2
              }}>
                <Image
                  src={profileImageUrl}
                  alt={HERO_DATA.name}
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  sizes="(max-width: 600px) 200px, (max-width: 768px) 250px, (max-width: 900px) 300px, (max-width: 1200px) 350px, 350px"
                  priority
                />
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;