import React from "react";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Link from "next/link";
import {
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";
import { CSSObject } from "@emotion/react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { MENU_ITEMS, BOTTOM_ITEMS } from "@/utils/drawerData";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  "& .MuiDrawer-paper": {
    borderRight: "none",
    ...((open && openedMixin(theme)) || (!open && closedMixin(theme))),
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface SideDrawerProps {
  open: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  handleDrawerToggle,
  isMobile,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const renderListItems = (items: typeof MENU_ITEMS) => {
    return items.map((item: any) => {
      const isActive =
        item.link === "/"
          ? router.pathname === item.link
          : router.pathname.startsWith(item.link);
      const icon = isActive ? item.icon.filled : item.icon.outline;

      return (
        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
          <Tooltip title={!open ? item.text : ""} placement="right" arrow>
            <ListItemButton
                component={Link}
                href={item.link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: "8px",
                  margin: "4px 8px",
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  backgroundColor: isActive
                    ? theme.palette.action.selected
                    : "transparent",
                  position: "relative", // Needed for the pseudo-element
                  "&:before": {
                    content: "''",
                    position: "absolute",
                    width: 0,
                    height: "2px",
                    bottom: "-4px",
                    left: 0,
                    background: theme.palette.primary.main,
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover:before": {
                    width: "100%",
                  },
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.primary.dark,
                  },
                  // Add focus styles for keyboard navigation
                  "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: "2px",
                  },
                  // Remove default hover effect to use our custom underline
                  "&:hover .MuiListItemText-root": {
                    transform: "none"
                  }
                }}
                aria-label={item.text}
              >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "inherit",
                }}>
                <Icon icon={icon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
                primaryTypographyProps={{ fontWeight: "500" }}
              />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      );
    });
  };

  // The content of the drawer (header, lists, etc.)
  const drawerContent = (
    <>
      <DrawerHeader>
        <Typography
          variant="h5"
          sx={{
            mr: "auto",
            pl: 2,
            opacity: open ? 1 : 0,
            fontFamily: "Orbitron, sans-serif",
            color: theme.palette.primary.main,
          }}>
          Azhagu-swe
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>{renderListItems(MENU_ITEMS)}</List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>{renderListItems(BOTTOM_ITEMS)}</List>
    </>
  );

  return (
    <>
      {/* Temporary Drawer for Mobile */}
      <MuiDrawer
        variant="temporary"
        open={isMobile && open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}>
        {drawerContent}
      </MuiDrawer>

      {/* Permanent Drawer for Desktop */}
      <StyledDrawer variant="permanent" open={open}>
        {drawerContent}
      </StyledDrawer>
    </>
  );
};

export default SideDrawer;
