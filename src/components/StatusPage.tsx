import React from "react";
import { Box, Typography, Button, useTheme, SvgIcon } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { ElementType } from "react";

import BuildIcon from "@mui/icons-material/Build";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface StatusPageProps {
  icon: ElementType;
  title: string;
  subtitle: string;
  quote?: string;
  buttonText: string;
  buttonLink: string;
}

const StatusPage: React.FC<StatusPageProps> = ({
  icon: Icon,
  title,
  subtitle,
  quote,
  buttonText,
  buttonLink,
}) => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "90vh",
        padding: 2,
        color: theme.palette.text.primary,
      }}>
      <motion.div variants={itemVariants}>
        <SvgIcon
          component={Icon}
          sx={{
            fontSize: { xs: "60px", md: "80px" },
            color: theme.palette.primary.main,
            mb: 2,
          }}
        />
      </motion.div>

      <Typography
        variant="h3"
        component={motion.h1}
        variants={itemVariants}
        sx={{
          mb: 2,
          fontWeight: "bold",
          fontSize: { xs: "2.5rem", md: "3.5rem" },
        }}>
        {title}
      </Typography>

      <Typography
        variant="h6"
        component={motion.p}
        variants={itemVariants}
        sx={{ mb: 4, maxWidth: "600px", color: "text.secondary" }}>
        {subtitle}
      </Typography>

      {quote && (
        <Typography
          variant="body1"
          component={motion.p}
          variants={itemVariants}
          sx={{ fontStyle: "italic", mb: 4, maxWidth: "600px" }}>
          &ldquo;{quote}&rdquo;
        </Typography>
      )}

      <motion.div variants={itemVariants}>
        <Link href={buttonLink} >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}>
            {buttonText}
          </Button>
        </Link>
      </motion.div>
    </Box>
  );
};

export const Maintenance = () => (
  <StatusPage
    icon={BuildIcon}
    title="We’ll Be Right Back!"
    subtitle="I'm upgrading the site with some powerful new features. Think of it as refactoring in progress!"
    quote="Good code, like good coffee, takes a little extra time."
    buttonText="Go to Homepage"
    buttonLink="/portfolio"
  />
);

export const ComingSoon = () => (
  <StatusPage
    icon={HourglassEmptyIcon}
    title="Page Under Construction"
    subtitle="Just like coding, great things take time. Stay tuned while I debug and deploy something amazing!"
    buttonText="Take Me Home"
    buttonLink="/portfolio"
  />
);

export const NotFound = () => (
  <StatusPage
    icon={SearchOffIcon}
    title="404: Page Not Found"
    subtitle="Oops! Looks like you wandered into the void. But hey, even the best coders hit a dead end sometimes!"
    quote="If at first you don’t succeed, try debugging."
    buttonText="Back to Safety"
    buttonLink="/portfolio"
  />
);

export const ErrorPage = () => (
  <StatusPage
    icon={ErrorOutlineIcon}
    title="Oops! Something Went Wrong"
    subtitle="It seems there was an unexpected error. Our team of highly trained monkeys has been dispatched to deal with the situation."
    quote="The best way to get a project done faster is to start sooner."
    buttonText="Try Again"
    buttonLink="/portfolio"
  />
);
