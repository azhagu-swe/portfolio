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
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "56px",
  },

  [theme.breakpoints.up("sm")]: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open && {
      marginLeft: 0,
    }),
    ...(!open && {
      marginLeft: `-${drawerWidth - 50}px`,
    }),
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "70px",
  },
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
    <Box sx={{ display: "flex", minHeight: "100vh" }} role="main">
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
          sx={{ 
            position: "fixed", 
            bottom: 0, 
            left: 0, 
            right: 0,
            zIndex: theme.zIndex.appBar + 1
          }}
          elevation={3}>
          <BottomNavigation
            showLabels
            value={bottomNavValue}
            onChange={(event: React.SyntheticEvent, newValue: string) => {
              setBottomNavValue(newValue);
              router.push(newValue);
            }}
            sx={{
              height: "56px",
              minHeight: "56px"
            }}
          >
            <BottomNavigationAction
              label="Home"
              value="/"
              icon={<HomeIcon />}
              sx={{
                minWidth: 0,
                padding: "6px 0",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  "&.Mui-selected": {
                    fontSize: "0.75rem",
                  }
                }
              }}
            />
            <BottomNavigationAction
              label="Experience"
              value="/experience"
              icon={<WorkHistoryIcon />}
              sx={{
                minWidth: 0,
                padding: "6px 0",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  "&.Mui-selected": {
                    fontSize: "0.75rem",
                  }
                }
              }}
            />
            <BottomNavigationAction
              label="Projects"
              value="/projects"
              icon={<AccountTreeIcon />}
              sx={{
                minWidth: 0,
                padding: "6px 0",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  "&.Mui-selected": {
                    fontSize: "0.75rem",
                  }
                }
              }}
            />
            <BottomNavigationAction
              label="Contact"
              value="/contact"
              icon={<MailIcon />}
              sx={{
                minWidth: 0,
                padding: "6px 0",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  "&.Mui-selected": {
                    fontSize: "0.75rem",
                  }
                }
              }}
            />
            <BottomNavigationAction
              label="Blog"
              value="/blog"
              icon={<Book />}
              sx={{
                minWidth: 0,
                padding: "6px 0",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.75rem",
                  "&.Mui-selected": {
                    fontSize: "0.75rem",
                  }
                }
              }}
            />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
};

export default Layout;
