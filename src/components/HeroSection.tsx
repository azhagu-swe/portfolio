import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/router";
import { HERO_DATA, ANIMATION_CONFIG } from "@/utils/heroData";
import Image from "next/image";

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "90vh",
        padding: "20px",
        backgroundImage: `url(${basePath}${HERO_DATA.images.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: { xs: "center", md: "left" },
      }}>
      {/* Text Section */}
      <Box>
        <Typography
          component={motion.h1}
          variant="h2"
          gutterBottom
          {...ANIMATION_CONFIG.text}>
          Hi, I&apos;m{" "}
          <span style={{ color: "#FFD700" }}>{HERO_DATA.name}</span>
        </Typography>

        <Typography
          component={motion.h1}
          variant="h2"
          gutterBottom
          color="primary"
          {...ANIMATION_CONFIG.text}>
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
          component={motion.h2}
          variant="h5"
          {...ANIMATION_CONFIG.text}
          transition={{ ...ANIMATION_CONFIG.text.transition, delay: 0.2 }}
          sx={{ mt: 3, lineHeight: 1.6 }}>
          {HERO_DATA.description}
        </Typography>

        <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            component={motion.button}
            variant="contained"
            size="large"
            {...ANIMATION_CONFIG.button}
            onClick={() => router.push("/contact")}>
            {HERO_DATA.buttons.hire}
          </Button>

          <Button
            component={motion.button}
            variant="outlined"
            size="large"
            {...ANIMATION_CONFIG.button}
            onClick={() =>
              window.open(`${basePath}${HERO_DATA.images.resume}`)
            }>
            {HERO_DATA.buttons.resume}
          </Button>
        </Box>
      </Box>

      {/* Profile Image */}
      <motion.div {...ANIMATION_CONFIG.image} style={{ marginLeft: "40px" }}>
        <Image
          src={`${basePath}${HERO_DATA.images.profile}`}
          alt={HERO_DATA.name}
          width={280}
          height={280}
          style={{
            borderRadius: "50%",
            boxShadow: theme.shadows[6],
            border: `4px solid ${theme.palette.primary.main}`,
          }}
        />
      </motion.div>
    </Box>
  );
};

export default HeroSection;
