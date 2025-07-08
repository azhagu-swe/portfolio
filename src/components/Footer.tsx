import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Stack, Divider, IconButton, Grid } from "@mui/material";
import { CONTACT_DATA } from "@/utils/contactData"; 


const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#F8F9FA',
  color: theme.palette.text.secondary,
  padding: theme.spacing(6, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center',
}));


const Footer = () => {
  const theme = useTheme();

  return (
    <FooterContainer>
      <FooterContent>
        <Grid container spacing={4} justifyContent="center">
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Azhagu-swe
            </Typography>
            <Typography variant="body2">
              A Full Stack Developer passionate about creating modern, scalable web applications.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1} alignItems="center">
              <Link href="/about" passHref><Typography variant="body2" sx={{ '&:hover': { color: theme.palette.primary.main, textDecoration: 'underline' }}}>About</Typography></Link>
              <Link href="/projects" passHref><Typography variant="body2" sx={{ '&:hover': { color: theme.palette.primary.main, textDecoration: 'underline' }}}>Projects</Typography></Link>
              <Link href="/contact" passHref><Typography variant="body2" sx={{ '&:hover': { color: theme.palette.primary.main, textDecoration: 'underline' }}}>Contact</Typography></Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Me
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              {CONTACT_DATA.socialLinks.map((social) => (
                <IconButton
                  key={social.platform}
                  component="a"
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  sx={{
                    color: 'text.secondary',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      color: social.color,
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <Icon icon={social.icon} width="24" height="24" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Azhagu-swe. All rights reserved.
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Crafted with ❤️ By Azhagu-swe
          </Typography>
        </Box>

      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;