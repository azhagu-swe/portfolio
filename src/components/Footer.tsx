import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Icon } from "@iconify/react";

const FooterBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  width: "100%",
}));

const SocialMediaLinks = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(2),
  "& a": {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
    transition: "color 0.3s, transform 0.3s",
    "&:hover": {
      color: theme.palette.secondary.main,
      transform: "scale(1.2)",
    },
  },
}));

const Footer = () => {
  return (
    <FooterBox>
      <Typography variant="body2" align="center" gutterBottom>
        &copy; {new Date().getFullYear()} Azhagu-swe. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center">
        Crafted with ❤️ by Azhagu-swe
      </Typography>
      <SocialMediaLinks>
        <Link href="https://github.com/azhagu-swe" passHref>
          <Icon icon="akar-icons:github-fill" width="24" height="24" />
        </Link>
        <Link href="https://linkedin.com/in/azhagu379" passHref>
          <Icon icon="akar-icons:linkedin-box-fill" width="24" height="24" />
        </Link>
        <Link href="https://twitter.com/azhagu-swe" passHref>
          <Icon icon="akar-icons:twitter-fill" width="24" height="24" />
        </Link>
        <Link href="https://instagram.com/azhagu.dev" passHref>
          <Icon icon="akar-icons:instagram-fill" width="24" height="24" />
        </Link>
      </SocialMediaLinks>
      <Box mt={3}>
        <Typography variant="body2" align="center">
          {"Coding is my art, and this site is my canvas."}
        </Typography>
      </Box>
    </FooterBox>
  );
};

export default Footer;
