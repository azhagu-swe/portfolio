import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Icon } from "@iconify/react";
import SideDrawer from "./SideDrawer";
import AppBarTop from "./AppBarTop";
import Footer from "./Footer";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const ContentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  margin: `${theme.spacing(5)} ${theme.spacing(2)} ${theme.spacing(
    3
  )} ${theme.spacing(7)}`,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper, // Branding green for light mode, semi-dark for dark mode

  ...(open && {
    marginLeft: drawerWidth - 30,
  }),
}));

const Layout: React.FC<{
  children: React.ReactNode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}> = ({ children, toggleTheme, isDarkMode }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    setShowScrollButton(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBarTop
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, overflow: "auto", position: "relative" }}>
        <ContentBox open={open}>{children}</ContentBox>
        <Fab
          color="primary"
          aria-label="scroll"
          onClick={showScrollButton ? scrollToTop : scrollToBottom}
          sx={{ position: "fixed", bottom: 16, right: 16 }}>
          {showScrollButton ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </Fab>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
