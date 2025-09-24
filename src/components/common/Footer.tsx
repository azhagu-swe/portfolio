import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Typography,
  Box,
  Stack,
  Divider,
  IconButton,
  Grid,
  Link as MuiLink,
  Tooltip,
  Paper,
  Container,
} from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { CONTACT_DATA } from "@/utils/contactData";
import { motion } from "framer-motion";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useVisitorCounts } from "@/context/VisitorContext";
import { useTouchDevice } from "@/hooks/useTouchDevice";

// Enhanced styled components for the new footer
const FooterRoot = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" 
    ? `linear-gradient(135deg, ${theme.palette.background.default}, #1a202c)` 
    : `linear-gradient(135deg, ${theme.palette.background.paper}, #e2e8f0)`,
  color: theme.palette.text.secondary,
  padding: theme.spacing(6, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "auto",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 1),
  },
  // Add a subtle wave effect at the top
  "&::before": {
    content: "''",
    position: "absolute",
    top: "-2px",
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
  },
  // Add animated background elements
  "&::after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 10% 20%, ${theme.palette.primary.main}10 0%, transparent 20%),
                     radial-gradient(circle at 90% 80%, ${theme.palette.secondary.main}10 0%, transparent 20%)`,
    pointerEvents: "none",
  }
}));

const FooterContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2, // Ensure content is above background elements
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
}));

const SocialIconWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
  borderRadius: "50%",
  background: theme.palette.mode === "dark" 
    ? `linear-gradient(145deg, ${theme.palette.grey[800]}, ${theme.palette.grey[900]})`
    : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[200]})`,
  boxShadow: theme.palette.mode === "dark"
    ? `0 4px 15px rgba(0, 0, 0, 0.3)`
    : `0 4px 15px rgba(0, 0, 0, 0.1)`,
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
  },
  "&:hover": {
    transform: "translateY(-5px) scale(1.05)",
    boxShadow: theme.palette.mode === "dark"
      ? `0 8px 25px rgba(0, 0, 0, 0.4)`
      : `0 8px 25px rgba(0, 0, 0, 0.2)`,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  transition: "all 0.3s ease",
  position: "relative",
  padding: "5px 0",
  "&:hover": {
    color: theme.palette.primary.main,
    "&::after": {
      width: "100%",
    },
  },
  "&::after": {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 0,
    height: "1px",
    background: theme.palette.primary.main,
    transition: "width 0.3s ease",
  },
}));

const FooterVisitorStats = () => {
  const { uniqueVisitors, totalVisits, loading } = useVisitorCounts();
  const theme = useTheme();
  const isTouchDevice = useTouchDevice();

  if (loading || !uniqueVisitors) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}>
      <Stack 
        direction={{ xs: "column", md: "row" }} 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
        sx={{ mt: 2, gap: 2 }}
      >
        {/* Unique Visitors Counter */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Paper
            variant="elevation"
            elevation={3}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              p: isTouchDevice ? "10px 20px" : "8px 16px",
              borderRadius: "50px",
              background: theme.palette.mode === "dark"
                ? `linear-gradient(145deg, ${theme.palette.grey[800]}, ${theme.palette.grey[900]})`
                : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[200]})`,
              boxShadow: theme.palette.mode === "dark"
                ? `0 4px 15px rgba(0, 0, 0, 0.3)`
                : `0 4px 15px rgba(0, 0, 0, 0.1)`,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
              cursor: "default",
            }}>
            <PeopleAltOutlinedIcon
              sx={{ fontSize: isTouchDevice ? 24 : 20, color: theme.palette.primary.main }}
            />
            <Typography
              variant="body2"
              component="p"
              sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
              {uniqueVisitors?.toLocaleString()}
            </Typography>
          </Paper>
        </motion.div>

        {/* Total Visits Counter */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Paper
            variant="elevation"
            elevation={3}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              p: isTouchDevice ? "10px 20px" : "8px 16px",
              borderRadius: "50px",
              background: theme.palette.mode === "dark"
                ? `linear-gradient(145deg, ${theme.palette.grey[800]}, ${theme.palette.grey[900]})`
                : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[200]})`,
              boxShadow: theme.palette.mode === "dark"
                ? `0 4px 15px rgba(0, 0, 0, 0.3)`
                : `0 4px 15px rgba(0, 0, 0, 0.1)`,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.divider}`,
              cursor: "default",
            }}>
            <VisibilityOutlinedIcon
              sx={{ fontSize: isTouchDevice ? 24 : 20, color: theme.palette.secondary.main }}
            />
            <Typography
              variant="body2"
              component="p"
              sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
              {totalVisits?.toLocaleString()}
            </Typography>
          </Paper>
        </motion.div>
      </Stack>
    </motion.div>
  );
};

const Footer = () => {
  const theme = useTheme();
  const isTouchDevice = useTouchDevice();

  // Touch-friendly icon button styles
  const touchIconStyles = {
    width: isTouchDevice ? 44 : 40,
    height: isTouchDevice ? 44 : 40,
    minHeight: isTouchDevice ? 44 : 40,
  };

  // Animation variants for footer sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <FooterRoot>
      <FooterContainer maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand Info Section */}
          <Grid item xs={12} md={4}>
            <motion.div>
              <FooterSection>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="h3"
                  sx={{
                    fontFamily: "Orbitron, sans-serif",
                    color: theme.palette.primary.main,
                    fontSize: { xs: "1.6rem", sm: "1.8rem" },
                    fontWeight: "bold",
                    position: "relative",
                    display: "inline-block",
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      bottom: "-8px",
                      left: 0,
                      width: "50%",
                      height: "3px",
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: "2px",
                    }
                  }}>
                  Azhagu-swe
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    mt: 3, 
                    lineHeight: 1.7, 
                    textAlign: { xs: "center", md: "left" }, 
                    fontSize: { xs: "0.9rem", sm: "0.95rem" },
                    color: theme.palette.text.secondary
                  }}>
                  A Full Stack Developer passionate about creating modern, scalable
                  web applications with attention to detail and user experience.
                </Typography>
              </FooterSection>
            </motion.div>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <motion.div initial="hidden" animate="visible">
              <FooterSection>
                <Typography 
                  variant="h6" 
                  color="text.primary" 
                  gutterBottom 
                  sx={{ 
                    fontSize: { xs: "1.2rem", sm: "1.3rem" },
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    mb: 2,
                    position: "relative",
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "40%",
                      height: "2px",
                      background: theme.palette.primary.main,
                      borderRadius: "1px",
                    }
                  }}>
                  Quick Links
                </Typography>
                <Stack 
                  spacing={1.5} 
                  alignItems={{ xs: "center", md: "flex-start" }}
                  component="nav"
                >
                  {[
                    { href: "/about", label: "About Me" },
                    { href: "/projects", label: "Projects" },
                    { href: "/contact", label: "Contact" },
                    { href: "/blog", label: "Blog" },
                    { href: "/experience", label: "Experience" },
                  ].map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <FooterLink href={link.href} passHref>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            fontWeight: 500,
                            color: "inherit",
                          }}
                        >
                          {link.label}
                        </Typography>
                      </FooterLink>
                    </motion.div>
                  ))}
                </Stack>
              </FooterSection>
            </motion.div>
          </Grid>

          {/* Connect Section */}
          <Grid item xs={12} md={4}>
            <motion.div  initial="hidden" animate="visible">
              <FooterSection>
                <Typography 
                  variant="h6" 
                  color="text.primary" 
                  gutterBottom 
                  sx={{ 
                    fontSize: { xs: "1.2rem", sm: "1.3rem" },
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    mb: 2,
                    position: "relative",
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "40%",
                      height: "2px",
                      background: theme.palette.primary.main,
                      borderRadius: "1px",
                    }
                  }}>
                  Connect With Me
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  flexWrap="wrap"
                  gap={1.5}
                >
                  {CONTACT_DATA.socialLinks.map((social, index) => (
                    <motion.div
                      key={social.platform}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, type: "spring", stiffness: 300 }}
                      whileHover={{ 
                        y: -5,
                        scale: 1.1,
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Tooltip title={social.platform} arrow>
                        <SocialIconWrapper>
                          <IconButton
                            component="a"
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.platform}
                            sx={{                          
                              color: theme.palette.mode === "dark" 
                                ? `${social.color}CC`  
                                : social.color,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                              ...touchIconStyles,
                            }}>
                            <Icon 
                              icon={social.icon} 
                              width={isTouchDevice ? "26" : "22"} 
                              height={isTouchDevice ? "26" : "22"} 
                            />
                          </IconButton>
                        </SocialIconWrapper>
                      </Tooltip>
                    </motion.div>
                  ))}
                </Stack>
              </FooterSection>
            </motion.div>
          </Grid>
        </Grid>

        <Divider 
          sx={{ 
            my: 4, 
            borderColor: theme.palette.divider,
            opacity: 0.3,
            background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
          }} 
        />

        <Box sx={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                color: theme.palette.text.secondary,
                mb: 1,
              }}
            >
              &copy; {new Date().getFullYear()} Azhagu-swe. All rights reserved.
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              Crafted with ❤️ using Next.js, TypeScript, and Material-UI
            </Typography>
          </motion.div>

          <FooterVisitorStats />
        </Box>
      </FooterContainer>
      
      {/* Animated decorative elements */}
      <Box 
        sx={{ 
          position: "absolute", 
          top: "20%", 
          right: "5%", 
          width: "100px", 
          height: "100px", 
          borderRadius: "50%", 
          background: `radial-gradient(circle, ${theme.palette.primary.main}30, transparent 70%)`,
          opacity: 0.2,
          animation: "pulse 6s infinite",
        }}
      />
      <Box 
        sx={{ 
          position: "absolute", 
          bottom: "10%", 
          left: "5%", 
          width: "80px", 
          height: "80px", 
          borderRadius: "50%", 
          background: `radial-gradient(circle, ${theme.palette.secondary.main}30, transparent 70%)`,
          opacity: 0.2,
          animation: "float 8s infinite",
        }}
      />
      
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(0) translateX(10px); }
          75% { transform: translateY(5px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </FooterRoot>
  );
};

export default Footer;
