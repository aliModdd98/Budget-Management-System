import React from "react";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const sections = [
  { label: "Home", path: "home", icon: <HomeIcon /> },
  { label: "OverView", path: "overView", icon: <DashboardIcon /> },
  { label: "Reports", path: "reports", icon: <AssessmentIcon /> },
];

const Aside = () => {
  const isSmallScreen = useMediaQuery("(max-width: 560px)");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <List
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
        alignItems: "center",
        color: "primary.main",
        height: "100vh",
      }}
    >
      {sections.map((section) => (
        <NavLink
          key={section.label}
          to={section.path}
          style={({ isActive }) => ({
            textDecoration: "none",
            width: "100%",
            color: isActive ? "white" : "#ff6500",
            backgroundColor: isActive ? "#ff6500" : "transparent",
            display: "flex",
            borderRadius: 6,
            alignItems: "center",
            transition: "color 0.3s, background-color 0.3s",
          })}
          onClick={toggleDrawer}
        >
          <ListItem
            button
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              color: "inherit",
              "&:hover": {
                bgcolor: "rgba(255, 105, 0, 0.2)",
              },
              transition: "color 0.3s, background-color 0.3s",
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 0, mb: 0.5 }}>
              {section.icon}
            </ListItemIcon>
            <ListItemText
              primary={section.label}
              sx={{ textAlign: "center", m: 0, p: 0 }}
            />
          </ListItem>
        </NavLink>
      ))}
    </List>
  );

  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              position: "fixed",
              left: 0,
              top: "95%",
              transform: "translateY(-50%)",
              zIndex: 1201,
              bgcolor: "#ff6500",
              borderRadius: "50%",
              boxShadow: 1,
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
                bgcolor: "navbar.background",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {drawerContent}
          </SwipeableDrawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            height: "100vh",
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              bgcolor: "navbar.background",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Aside;
