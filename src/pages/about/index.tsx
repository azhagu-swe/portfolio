import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Avatar,
  Chip,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";


const AboutMe: React.FC = () => {
  const theme = useTheme();
  const { basePath } = useRouter();

  // Animations Variants
  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 12px 30px rgba(50, 205, 50, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  const listVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

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
            {
              title: "Frontend",
              skills:
                "React, Redux, HTML5, CSS3, JavaScript, Next.js, TypeScript, MUI",
            },
            {
              title: "Backend",
              skills: "Java, Spring Boot, RESTful APIs, RabbitMQ, Redis",
            },
            { title: "Database", skills: "PostgreSQL, MySQL" },
            { title: "Version Control", skills: "Git, GitHub" },
            { title: "Deployment", skills: "Netlify, Render, GitHub Pages" },
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
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
                variants={cardVariants}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.skills}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Education Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          color={theme.palette.primary.main}
          sx={{ fontWeight: "bold", mb: 2 }}>
          Education
        </Typography>
        {[
          {
            degree: "Master's in Computer Science",
            institution: "H.H. The Rajah's College, Bharathidasan University",
            year: "2020",
            grade: "Percentage: 74%",
          },
          {
            degree: "Bachelor's in Computer Science",
            institution: "H.H. The Rajah's College, Bharathidasan University",
            year: "2018",
            grade: "Percentage: 71%",
          },
        ].map((edu, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              borderRadius: "8px",
              padding: "15px",
            }}
            component={motion.div}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {edu.degree}
            </Typography>
            <Typography variant="body2">
              {edu.institution} ({edu.year}) - {edu.grade}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Certifications */}
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
              name: "FullStack Java Development ",
              img:`${basePath}/image/Java-Full-Stack-skillup.png`,
            },
            {
              name: "Java Certificate Course",
              img: `${basePath}/image/java-certificate.jpg`,
            },
            {
              name: "Advanced C++",
              img: `${basePath}/image/c++ certificate.jpg`,
            },
          ].map((cert, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                sx={{
                  textAlign: "center",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  // height: "200px", // Set height for the container
                }}>
              <Image
                src={cert.img}
                alt={cert.name}
                layout="responsive"
                width={300} 
                height={200}
                style={{
                  objectFit: "cover", // Crop or scale images to fill the area
                  borderRadius: "8px",
                }}
              
              />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    padding: "10px",
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                  }}>
                  {cert.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Achievements */}
      <Box>
        <Typography
          variant="h4"
          color={theme.palette.primary.main}
          sx={{ fontWeight: "bold", color: "#32CD32", mb: 2 }}>
          Achievements
        </Typography>
        {[
          {
            description:
              "🏆 2nd Prize in Debugging Competition - Awarded for exceptional debugging in a competitive debugging contest.",
          },
        ].map((achievement, index) => (
          <Typography
            variant="body2"
            sx={{ mt: 2 }}
            key={index}
            component={motion.div}
            whileHover={{ scale: 1 }}>
            {achievement.description}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default AboutMe;
