import React, { useMemo } from "react";
import { Box, Typography, Button, useTheme, Grid } from "@mui/material";
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

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "90vh",
        padding: { xs: "20px", md: "40px" },
      }}>
      <Grid
        item
        xs={12}
        md={7}
        sx={{ textAlign: { xs: "center", md: "left" } }}>
        <motion.div
          variants={HERO_ANIMATION_CONFIG.textContainer}
          initial="hidden"
          animate="show">
          <Typography
            component={motion.h1}
            variant="h2"
            gutterBottom
            variants={HERO_ANIMATION_CONFIG.item}>
            Hi, I&apos;m{" "}
            <span style={{ color: theme.palette.primary.main }}>
              {HERO_DATA.name}
            </span>
          </Typography>

          <Typography
            component={motion.h1}
            variant="h2"
            gutterBottom
            color="text.primary"
            variants={HERO_ANIMATION_CONFIG.item}
            sx={{
              minHeight: { xs: 140, sm: "auto" },
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
            variant="h5"
            color="text.secondary"
            variants={HERO_ANIMATION_CONFIG.item}
            sx={{ mt: 3, lineHeight: 1.6, textAlign: "justify" }}>
            {HERO_DATA.description}
          </Typography>

          <motion.div variants={HERO_ANIMATION_CONFIG.item}>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" },
              }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push("/contact")}
                sx={{ "&:hover": { transform: "translateY(-2px)" } }}
                role="button"
                aria-label="Contact me for hiring opportunities">
                {HERO_DATA.buttons.hire}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  window.open(`${basePath}${HERO_DATA.images.resume}`)
                }
                sx={{ "&:hover": { transform: "translateY(-2px)" } }}
                role="button"
                aria-label="Download my resume">
                {HERO_DATA.buttons.resume}
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 6, md: 0 },
        }}>
        <motion.div initial="hidden" animate="show" variants={HERO_ANIMATION_CONFIG.image}>
          <Box
            sx={{
              position: "relative",
              width: { xs: 250, sm: 300, md: 350 },
              height: { xs: 250, sm: 300, md: 350 },
              borderRadius: "50%",
              border: `4px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 30px ${theme.palette.primary.light}`,
            }}>
            <Image
              src={profileImageUrl}
              alt={HERO_DATA.name}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "50%",
              }}
              sizes="(max-width: 768px) 250px, (max-width: 900px) 300px, 350px"
              priority // Add priority loading for the main hero image
            />
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
