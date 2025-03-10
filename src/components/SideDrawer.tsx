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
import { Tooltip } from "@mui/material";
import CustomizeTooltip from "./style/CustomizeTooltip";
import { useRouter } from "next/router";
import { MENU_ITEMS, BOTTOM_ITEMS } from "@/utils/drawerData";
import Image from "next/image";

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
  const iconSize = 28;
  const { basePath } = router;

  const renderListItems = (items: typeof MENU_ITEMS) => {
    return items.map((item: any) => {
      const isActive = router.pathname === item.link;
      const icon = isActive ? item.icon.filled : item.icon.outline;

      return (
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
                  color: theme.palette.secondary.main,
                  transform: "scale(1.2)",
                },
                transition: "color 0.3s, transform 0.3s",
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: isActive
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                  transition: "color 0.3s, transform 0.3s",
                }}>
                <Icon icon={icon} width={iconSize} height={iconSize} />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </CustomizeTooltip>
        </ListItem>
      );
    });
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {/* Logo Container */}
        {/* <div style={{ 
          position: 'absolute',
          left: 16,
          transition: 'opacity 0.3s ease',
          // opacity: open ? 1 : 0
        }}>
          <Image
            src={`${basePath}/favicon.ico`}
            alt="Your Logo"
            width={32}
            height={32}
            style={{
              borderRadius: '50%',
              boxShadow: theme.shadows[3],
              border: `2px solid ${theme.palette.background.paper}`
            }}
          />
        </div> */}
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
      <List>{renderListItems(MENU_ITEMS)}</List>
      <Divider />
      <List sx={{ marginTop: "auto" }}>{renderListItems(BOTTOM_ITEMS)}</List>
    </Drawer>
  );
};

export default SideDrawer;
