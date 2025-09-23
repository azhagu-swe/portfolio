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
} from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { CONTACT_DATA } from "@/utils/contactData";
import { motion } from "framer-motion";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useVisitorCounts } from "@/context/VisitorContext";

const FooterRoot = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(6, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "40px",
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
}));

const FooterVisitorStats = () => {
  const { uniqueVisitors, totalVisits, loading } = useVisitorCounts();
  const theme = useTheme();

  if (loading || !uniqueVisitors) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        {/* Unique Visitors Counter */}
        <Paper
          variant="outlined"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            p: "6px 12px",
            borderRadius: "50px",
            backgroundColor: "transparent",
            borderColor: theme.palette.primary.main,
            boxShadow: `0 2px 12px 0 ${theme.palette.primary.light}55`,
            color: theme.palette.text.primary,
          }}>
          <PeopleAltOutlinedIcon
            sx={{ fontSize: 18, color: theme.palette.primary.main }}
          />
          <Typography
            variant="body2"
            component="p"
            sx={{ fontWeight: "medium" }}>
            {uniqueVisitors?.toLocaleString()}
          </Typography>
        </Paper>

        {/* Total Visits Counter */}
        <Paper
          variant="outlined"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            p: "6px 12px",
            borderRadius: "50px",
            backgroundColor: "transparent",
            borderColor: theme.palette.secondary.main,
            boxShadow: `0 2px 12px 0 ${theme.palette.secondary.light}55`,
            color: theme.palette.text.primary,
          }}>
          <VisibilityOutlinedIcon
            sx={{ fontSize: 18, color: theme.palette.secondary.main }}
          />
          <Typography
            variant="body2"
            component="p"
            sx={{ fontWeight: "medium" }}>
            {totalVisits?.toLocaleString()}
          </Typography>
        </Paper>
      </Stack>
    </motion.div>
  );
};

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterRoot>
      <FooterContent>
        <Grid container spacing={4} textAlign={{ xs: "center", md: "left" }}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontFamily: "Orbitron, sans-serif",
                color: theme.palette.primary.main,
              }}>
              Azhagu-swe
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 3, lineHeight: 1.6, textAlign: "justify" }}>
              A Full Stack Developer passionate about creating modern, scalable
              web applications.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
              <Link href="/about" passHref>
                About
              </Link>
              <Link href="/projects" passHref>
                Projects
              </Link>
              <Link href="/contact" passHref>
                Contact
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Me
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={{ xs: "center", md: "flex-start" }}>
              {CONTACT_DATA.socialLinks.map((social) => (
                <Tooltip title={social.platform} key={social.platform} arrow>
                  <IconButton
                    component="a"
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    sx={{
                      color: "text.secondary",
                      transition: "color 0.3s ease, transform 0.3s ease",
                      "&:hover": {
                        color: social.color,
                        transform: "translateY(-3px)",
                      },
                    }}>
                    <Icon icon={social.icon} width="24" height="24" />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255, 255, 255, 0.08)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Azhagu-swe. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Crafted with ❤️ By Azhagu-swe
          </Typography>

          <FooterVisitorStats />
        </Box>
      </FooterContent>
    </FooterRoot>
  );
};

export default Footer;
