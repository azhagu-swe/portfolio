import React from "react";
import { Box, Typography, Button, useTheme, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/router";
import { HERO_DATA } from "@/utils/heroData";
import Image from "next/image";

const ANIMATION_CONFIG = {
  textContainer: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  image: {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
};

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;

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
          variants={ANIMATION_CONFIG.textContainer}
          initial="hidden"
          animate="show">
          <Typography
            component={motion.h1}
            variant="h2"
            gutterBottom
            variants={ANIMATION_CONFIG.item}>
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
            variants={ANIMATION_CONFIG.item}
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
            variants={ANIMATION_CONFIG.item}
            sx={{ mt: 3, lineHeight: 1.6, textAlign: "justify" }}>
            {HERO_DATA.description}
          </Typography>

          <motion.div variants={ANIMATION_CONFIG.item}>
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
                sx={{ "&:hover": { transform: "translateY(-2px)" } }}>
                {HERO_DATA.buttons.hire}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() =>
                  window.open(`${basePath}${HERO_DATA.images.resume}`)
                }
                sx={{ "&:hover": { transform: "translateY(-2px)" } }}>
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
        <motion.div initial="hidden" animate="show">
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
              src={`${basePath}${HERO_DATA.images.profile}`}
              alt={HERO_DATA.name}
              layout="fill"
              objectFit="cover"
              style={{
                borderRadius: "50%",
              }}
            />
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default HeroSection;
