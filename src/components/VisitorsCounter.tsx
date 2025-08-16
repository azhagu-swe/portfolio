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
import { useVisitorCounts } from "@/context/VisitorContex";

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

  return <span ref={ref}>0</span>;
};

const VisitorCounter: React.FC = () => {
  const { uniqueVisitors, totalVisits, loading, error } = useVisitorCounts();
  const theme = useTheme();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
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
    <Box sx={{ my: 6 }}>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center">
          {uniqueVisitors !== null && (
            <motion.div variants={itemVariants}>
              <Paper
                variant="outlined" // Use outline instead of solid fill
                sx={{
                  p: 3,
                  textAlign: "center",
                  minWidth: 240,
                  borderRadius: 3,
                  backgroundColor: 'transparent', // No fill color
                  borderColor: theme.palette.primary.main, // Primary color for the outline
                  color: theme.palette.text.primary, // Standard text color
                  boxShadow: `0 4px 24px 0 ${theme.palette.primary.light}60`, // Shadow with primary color
                }}>
                <PeopleAltIcon sx={{ fontSize: 40, mb: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" component="h3">
                  Unique Visitors
                </Typography>
                <Typography variant="h3" component="p" fontWeight="bold">
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
                  p: 3,
                  textAlign: "center",
                  minWidth: 240,
                  borderRadius: 3,
                  backgroundColor: 'transparent', // No fill color
                  borderColor: theme.palette.secondary.main, // Secondary color for the outline
                  color: theme.palette.text.primary, // Standard text color
                  boxShadow: `0 4px 24px 0 ${theme.palette.secondary.light}60`, // Shadow with secondary color
                }}>
                <VisibilityIcon sx={{ fontSize: 40, mb: 1, color: theme.palette.secondary.main }} />
                <Typography variant="h6" component="h3">
                  Total Page Views
                </Typography>
                <Typography variant="h3" component="p" fontWeight="bold">
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
