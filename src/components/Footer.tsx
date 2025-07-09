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
} from "@mui/material";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { CONTACT_DATA } from "@/utils/contactData";

const FooterRoot = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  padding: theme.spacing(6, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  marginTop: "20px",
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
}));

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
            <Typography variant="body2">
              A Full Stack Developer passionate about creating modern, scalable
              web applications.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
              <Link href="/about" passHref legacyBehavior>
                <MuiLink color="inherit" underline="hover">
                  About
                </MuiLink>
              </Link>
              <Link href="/projects" passHref legacyBehavior>
                <MuiLink color="inherit" underline="hover">
                  Projects
                </MuiLink>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <MuiLink color="inherit" underline="hover">
                  Contact
                </MuiLink>
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
                        color: social.color, // Using color from your data object
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

        <Box>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Azhagu-swe. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Crafted with ❤️ By Azhagu-swe
          </Typography>
        </Box>
      </FooterContent>
    </FooterRoot>
  );
};

export default Footer;
