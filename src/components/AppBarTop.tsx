// AppBarTop.js
import * as React from "react";
import { Toolbar, IconButton, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Icon } from "@iconify/react/dist/iconify.js";

interface CustomAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginRight: 40, // Add a small margin on the right side
  width: `calc(100% - ${120}px )`, // Adjust width for margin
  backgroundColor: theme.palette.primary.main, // Use secondary color when open
  transition: theme.transitions.create(
    ["width", "margin", "background-color"],
    {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }
  ),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px - 35px)`,
    transition: theme.transitions.create(
      ["width", "margin", "background-color"],
      {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }
    ),
  }),
}));

const AppBarTop: React.FC<CustomAppBarProps> = ({
  open,
  handleDrawerOpen,
  toggleTheme,
  isDarkMode,
}) => {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}>
          <MenuIcon />
        </IconButton> */}
        <Typography align="center" variant="h6" noWrap component="div">
          Portfolio
        </Typography>
        <IconButton
          color="default"
          onClick={toggleTheme}
          sx={{ marginLeft: "auto" }}>
          <Icon
            icon={isDarkMode ? "mdi:weather-night" : "mdi:white-balance-sunny"}
            fontSize="1.5rem"
            color={isDarkMode ? "#ffffff" : "#000000"}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarTop;
