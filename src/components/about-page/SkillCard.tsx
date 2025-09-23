import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const SkillCard = ({ title, skills }: { title: string; skills: string }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 2,
        textAlign: "left",
        border: `2px solid ${theme.palette.primary.main}20`,
        background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        minHeight: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          borderColor: `${theme.palette.primary.main}40`,
          transform: "translateY(-8px)",
          boxShadow: theme.shadows[4],
        },
      }}
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      {/* Title with accent bar */}
      <Box sx={{ position: "relative", mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            position: "relative",
            zIndex: 1,
            pl: 2,
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "4px",
              height: "24px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2px",
            },
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Skills list with bullet points */}
      <Box
        component="ul"
        sx={{
          pl: 0,
          m: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 1,
        }}
      >
        {skills.split(", ").map((skill, index) => (
          <Box
            component="li"
            key={index}
            sx={{
              listStyle: "none",
              display: "flex",
              alignItems: "center",
              fontSize: "0.9rem",
              "&:before": {
                content: '"▹"',
                color: theme.palette.primary.main,
                mr: 1,
                fontSize: "0.8rem",
              },
            }}
          >
            {skill}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkillCard;