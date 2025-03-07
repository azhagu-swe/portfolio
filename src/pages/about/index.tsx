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

const AboutMe: React.FC = () => {
  const theme = useTheme();
  const { basePath } = useRouter();

  // Common Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const hoverEffect = {
    hover: {
      scale: 1.05,
      boxShadow: "0 12px 30px rgba(50, 205, 50, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  // Reusable Skill Card Component
  const SkillCard = ({ title, skills }: { title: string; skills: string }) => (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        border: `2px solid ${theme.palette.primary.main}`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s ease",
        "&:hover": {
          borderColor: "#FFD700",
          transform: "translateY(-10px)",
        },
      }}
      component={motion.div}
      whileHover="hover"
      variants={hoverEffect}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="body2">{skills}</Typography>
    </Box>
  );

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
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Avatar
          src="/path/to/profile-photo.jpg"
          alt="Alagappan"
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
          Hi, I&apos;m Alagappan ☕
        </Typography>
        <Typography variant="h6" sx={{ fontStyle: "italic", mt: 1 }}>
          Java Specialist | Full Stack Developer
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          👋 With 2.5 years of experience as a Software Engineer, I specialize
          in building scalable, secure, and responsive applications. 🎯 Holding
          a Master&apos;s degree in Computer Applications, I thrive on solving
          complex problems and creating impactful digital solutions. 🚀
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Skills Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          color={theme.palette.primary.main}
          sx={{ fontWeight: "bold", mb: 2 }}>
          My Skills
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: "Frontend", skills: "React, Redux, Next.js, TypeScript" },
            { title: "Backend", skills: "Java, Spring Boot, RESTful APIs" },
            { title: "Database", skills: "PostgreSQL, MySQL" },
            { title: "Version Control", skills: "Git, GitHub" },
            { title: "Deployment", skills: "Netlify, Render" },
          ].map((skill, index) => (
            <Grid item xs={12} md={6} key={index}>
              <SkillCard {...skill} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Certifications Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          color={theme.palette.primary.main}
          sx={{ fontWeight: "bold", mb: 2 }}>
          Certifications
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              description: "FullStack Java Development",
              img: `${basePath}/image/Java-Full-Stack-skillup.png`,
            },
            {
              description: "Java Certificate Course",
              img: `${basePath}/image/java-certificate.jpg`,
            },
            {
              description: "Advanced C++",
              img: `${basePath}/image/c++ certificate.jpg`,
            },
          ].map((cert, index) => (
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
          color={theme.palette.primary.main}
          sx={{ fontWeight: "bold", mb: 2 }}>
          Achievements
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              description:
                "🏆 2nd Prize in Debugging Competition - Exceptional debugging in a competitive contest.",
              img: `${basePath}/image/Debuggin-2nd-Prize.jpg`,
            },
          ].map((achievement, index) => (
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
