import React from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Link from "next/link";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Icon } from "@iconify/react";
import { CSSObject } from "@emotion/react";
import { color } from "framer-motion";
import { BorderColor } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import CustomizeTooltip from "./style/CustomizeTooltip";
import { useRouter } from "next/router";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  position: "relative",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "-15px",
  transform: "translateY(-50%)",
  borderRadius: "50%",
  boxShadow: theme.shadows[3],
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth - 20,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  // border: `2px solid ${theme.palette.secondary.main}`, // Yellow outline for drawer
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  // border: `2px solid ${theme.palette.secondary.main}`, // Yellow outline for drawer
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const router = useRouter();

  const iconSize = 28; // Adjust size as needed

  const menuItems = [
    {
      text: "Home",
      icon: (
        <Icon
          icon="material-symbols:home-outline-rounded"
          width={iconSize}
          height={iconSize}
        />
      ),
      link: "/",
    },
    {
      text: "About",
      icon: <Icon icon="tabler:user-code" width={iconSize} height={iconSize} />,
      link: "/about",
    },
    {
      text: "Experience",
      icon: <Icon icon="pajamas:work" width={iconSize} height={iconSize} />,
      link: "/experience",
    },
    {
      text: "Skills",
      icon: (
        <Icon
          icon="hugeicons:knowledge-02"
          width={iconSize}
          height={iconSize}
        />
      ),
      link: "/skills",
    },
    {
      text: "Projects",
      icon: (
        <Icon
          icon="eos-icons:application-outlined"
          width={iconSize}
          height={iconSize}
        />
      ),
      link: "/projects",
    },
    {
      text: "Contact",
      icon: (
        <Icon
          icon="fluent:mail-24-regular"
          width={iconSize}
          height={iconSize}
        />
      ),
      link: "/contact",
    },
  ];

  const bottomItems = [
    {
      text: "Tutorial",
      icon: (
        <Icon
          icon="hugeicons:laptop-programming"
          width={iconSize}
          height={iconSize}
        />
      ),
      link: "/tutorial",
    },
    {
      text: "Blog",
      icon: (
        <Icon
          icon="material-symbols:menu-book-outline"
          width={iconSize}
          height={iconSize}
        />
      ),
      link: "/blog",
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <StyledIconButton
          sx={{ backgroundColor: theme.palette.primary.main }}
          onClick={handleDrawerClose}>
          {open ? (
            <ChevronLeftIcon
              sx={{
                color: "white",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          ) : (
            <ChevronRightIcon
              sx={{
                color: "white",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          )}
        </StyledIconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <CustomizeTooltip
              title={!open ? item.text : ""}
              placement="right"
              arrow>
              <ListItemButton
                component={Link}
                href={item.link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover .MuiListItemIcon-root": {
                    color: theme.palette.secondary.main, // Change color on hover
                    transform: "scale(1.2)",
                  },
                  transition: "color 0.3s, transform 0.3s", // Smooth hover effect
                }}>
                <ListItemIcon
                className="MuiListItemIcon-root"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: router.pathname === item.link
                    ? theme.palette.secondary.main // Change color if the link is active
                    : theme.palette.primary.main, // Default color
                  transition: "color 0.3s, transform 0.3s",
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </CustomizeTooltip>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ marginTop: "auto" }}>
        {bottomItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <CustomizeTooltip
              title={!open ? item.text : ""}
              placement="right"
              arrow>
              <ListItemButton
                component={Link}
                href={item.link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover .MuiListItemIcon-root": {
                    color: theme.palette.secondary.main, // Change color on hover
                    transform: "scale(1.2)",
                  },
                  transition: "color 0.3s, transform 0.3s", // Smooth hover effect
                }}>
                <ListItemIcon
                 className="MuiListItemIcon-root"
                 sx={{
                   minWidth: 0,
                   mr: open ? 3 : "auto",
                   justifyContent: "center",
                   color: router.pathname === item.link
                     ? theme.palette.secondary.main // Change color if the link is active
                     : theme.palette.primary.main, // Default color
                   transition: "color 0.3s, transform 0.3s",
                 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </CustomizeTooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
