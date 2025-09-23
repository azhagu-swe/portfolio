import React from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon } from "@iconify/react";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  background: theme.palette.primary.main,
  backdropFilter: "blur(10px)",
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,

  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...(open && {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
}));

interface AppBarTopProps {
  open: boolean;
  handleDrawerToggle: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const AppBarTop: React.FC<AppBarTopProps> = ({
  open,
  handleDrawerToggle,
  toggleTheme,
  isDarkMode,
}) => {
  const theme = useTheme();
  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{
            marginRight: 2,
            display: { sm: open ? "none" : "block" },
          }}>
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Orbitron, sans-serif",
            color: theme.palette.text.primary,
          }}>
          {!open && "Azhagu-swe"}
        </Typography>

        <IconButton color="inherit" onClick={toggleTheme}>
          <Icon
            icon={isDarkMode ? "mdi:weather-night" : "mdi:white-balance-sunny"}
            width={24}
            height={24}
          />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBarTop;
