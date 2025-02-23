import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/router";

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "90vh",
        padding: "20px",
        backgroundImage: `url(/path/to/background.jpg)`,
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Hi, I&apos;m <span style={{ color: "#FFD700" }}>Alagappan</span>
        </Typography>
        <Typography
          component={motion.h1}
          variant="h2"
          gutterBottom
          color={theme.palette.primary.main}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <Typewriter
            words={[
              "Software Engineer 👨‍💻",
              "Java Specialist ☕",
              "Web Developer 🌐 ",
              "Full Stack Developer 🛠️ ",
            ]}
            loop={0} // Infinite loop
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1200}
          />
        </Typography>
        <Typography
          component={motion.h2}
          variant="h5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}>
          👋 I am a Software Engineer with 2.5 years of experience as a Full
          Stack Developer. ☕ I specialize in building scalable, secure, and
          responsive applications. 🎯 Holding a Master&apos;s degree in Computer
          Applications, I thrive on solving complex problems and creating
          impactful digital solutions. 🚀
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            component={motion.button}
            variant="contained"
            color="primary"
            sx={{ marginRight: 2, padding: "10px 20px" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/contact")} // Redirect to the Hire Me page
          >
            Hire Me
          </Button>
          {/* Download Resume Button */}
          <Button
            component={motion.button}
            variant="outlined"
            color="primary"
            sx={{ padding: "10px 20px" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("/path/to/resume.pdf")}>
            Download Resume
          </Button>
        </Box>
      </Box>

      {/* Profile Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}>
        <img
          src="/path/to/photo.jpg"
          alt="Azhagu"
          style={{
            width: "250px",
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        />
      </motion.div>
    </Box>
  );
};

export default HeroSection;
