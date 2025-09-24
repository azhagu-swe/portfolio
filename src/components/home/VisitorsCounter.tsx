import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { motion, useInView, animate } from "framer-motion";
import { useVisitorCounts } from "@/context/VisitorContext";

// A reusable component to animate numbers counting up
const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2,
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toLocaleString();
          }
        },
      });
    }
  }, [isInView, value]);

  return <span ref={ref} aria-label={`${value} visitors`} tabIndex={0}>{value.toLocaleString()}</span>;
};

const VisitorCounter: React.FC = () => {
  const { uniqueVisitors, totalVisits, loading, error } = useVisitorCounts();
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: { xs: 6, sm: 8 } }} role="status" aria-live="polite">
        <CircularProgress />
        <span className="sr-only">Loading visitor statistics...</span>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: { xs: 6, sm: 8 } }} role="alert" aria-live="assertive">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 2, sm: 3, lg: 4 },
        maxWidth: "1200px",
        mx: "auto"
      }}
      aria-label="Visitor Statistics"
    >
      <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6 } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" }
          }}
        >
          Visitor Statistics
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            maxWidth: "700px",
            mx: "auto",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" }
          }}
        >
          Join the community of visitors exploring my portfolio
        </Typography>
      </Box>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 3, sm: 4, md: 6 }}
          justifyContent="center"
          alignItems="center">
          {uniqueVisitors !== null && (
            <motion.div variants={itemVariants}>
              <Paper
                variant="outlined" // Use outline instead of solid fill
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  textAlign: "center",
                  minWidth: { xs: 240, sm: 280, md: 300 },
                  borderRadius: "16px",
                  backgroundColor: 'transparent',
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  boxShadow: `0 5px 15px ${theme.palette.mode === "dark"
                    ? "rgba(0, 0, 0, 0.3)"
                    : "rgba(0, 0, 0, 0.1)"}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-5px)" },
                    boxShadow: `0 10px 25px ${theme.palette.primary.main}40`,
                  }
                }}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: { xs: 1.5, sm: 2 }
                }}>
                  <Box sx={{
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    borderRadius: "50%",
                    backgroundColor: `${theme.palette.primary.main}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <PeopleAltIcon sx={{
                      fontSize: { xs: 32, sm: 36, md: 40 },
                      color: theme.palette.primary.main
                    }} />
                  </Box>
                </Box>
                <Typography variant="h6" component="h3" sx={{ mb: { xs: 1, sm: 2 } }}>
                  Unique Visitors
                </Typography>
                <Typography
                  variant="h2"
                  component="p"
                  fontWeight="bold"
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" }
                  }}
                >
                  <AnimatedNumber value={uniqueVisitors} />
                </Typography>
              </Paper>
            </motion.div>
          )}

          {totalVisits !== null && (
            <motion.div variants={itemVariants}>
              <Paper
                variant="outlined" // Use outline instead of solid fill
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  textAlign: "center",
                  minWidth: { xs: 240, sm: 280, md: 300 },
                  borderRadius: "16px",
                  backgroundColor: 'transparent',
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.text.primary,
                  boxShadow: `0 5px 15px ${theme.palette.mode === "dark"
                    ? "rgba(0, 0, 0, 0.3)"
                    : "rgba(0, 0, 0, 0.1)"}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-5px)" },
                    boxShadow: `0 10px 25px ${theme.palette.secondary.main}40`,
                  }
                }}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: { xs: 1.5, sm: 2 }
                }}>
                  <Box sx={{
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    borderRadius: "50%",
                    backgroundColor: `${theme.palette.secondary.main}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <VisibilityIcon sx={{
                      fontSize: { xs: 32, sm: 36, md: 40 },
                      color: theme.palette.secondary.main
                    }} />
                  </Box>
                </Box>
                <Typography variant="h6" component="h3" sx={{ mb: { xs: 1, sm: 2 } }}>
                  Total Views
                </Typography>
                <Typography
                  variant="h2"
                  component="p"
                  fontWeight="bold"
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" }
                  }}
                >
                  <AnimatedNumber value={totalVisits} />
                </Typography>
              </Paper>
            </motion.div>
          )}
        </Stack>
      </motion.div>
    </Box>
  );
};

export default VisitorCounter;
