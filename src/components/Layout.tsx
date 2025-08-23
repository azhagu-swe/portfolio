import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Fab,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";

import SideDrawer from "./SideDrawer";
import AppBarTop from "./AppBarTop";
import Footer from "./Footer";

import HomeIcon from "@mui/icons-material/Home";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Book } from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  [theme.breakpoints.up("sm")]: {
    ...(open && {
      marginLeft: `-15px`,

      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(!open && {
      marginLeft: `-190px`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
}));

const Layout: React.FC<{
  children: React.ReactNode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}> = ({ children, toggleTheme, isDarkMode }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(!isMobile);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const [bottomNavValue, setBottomNavValue] = React.useState(router.pathname);
  React.useEffect(() => {
    setBottomNavValue(router.pathname);
  }, [router.pathname]);

  const [showScrollUp, setShowScrollUp] = React.useState(false);
  const handleScroll = React.useCallback(() => {
    setShowScrollUp(window.scrollY > 300);
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBarTop
        open={!isMobile && open}
        handleDrawerToggle={handleDrawerToggle}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <SideDrawer
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Main open={!isMobile && open}>
          <Box sx={theme.mixins.toolbar} />

          <ContentBox>{children}</ContentBox>
          <Footer />
        </Main>
      </Box>

      {!isMobile && (
        <Fab
          color="primary"
          aria-label="scroll to top"
          onClick={scrollToTop}
          sx={{
            display: showScrollUp ? "flex" : "none",
            position: "fixed",
            bottom: 32,
            right: 32,
          }}>
          <KeyboardArrowUpIcon />
        </Fab>
      )}

      {isMobile && (
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}>
          <BottomNavigation
            showLabels
            value={bottomNavValue}
            onChange={(event: React.SyntheticEvent, newValue: string) => {
              setBottomNavValue(newValue);
              router.push(newValue);
            }}>
            <BottomNavigationAction
              label="Home"
              value="/"
              icon={<HomeIcon />}
            />
            <BottomNavigationAction
              label="Experience"
              value="/experience"
              icon={<WorkHistoryIcon />}
            />
            <BottomNavigationAction
              label="Projects"
              value="/projects"
              icon={<AccountTreeIcon />}
            />
            <BottomNavigationAction
              label="Contact"
              value="/contact"
              icon={<MailIcon />}
            />
              <BottomNavigationAction
              label="Blog"
              value="/blog"
              icon={<Book />}
            />
          </BottomNavigation>
          
        </Paper>
      )}
    </Box>
  );
};

export default Layout;
