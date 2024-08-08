"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import WidgetsIcon from "@mui/icons-material/WidgetsOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LaptopIcon from "@mui/icons-material/Laptop";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { GiShoppingCart } from "react-icons/gi";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import style from "../style/sidenav.module.css";

type SideBarProps = {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
  handleClose: () => void;
  anchorElNav: HTMLElement | null;
};

export default function SideBar({
  handleOpenNavMenu,
  handleCloseNavMenu,
  handleClose,
  anchorElNav,
}: Readonly<SideBarProps>) {
  const [openConfig, setOpenConfig] = useState(false);

  const handleToggleConfig = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpenConfig(!openConfig);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 890) {
        handleCloseNavMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleCloseNavMenu]);

  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <WidgetsIcon className={style.iconBar} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleToggleConfig}>
                <ListItemIcon>
                  <LocalMallOutlinedIcon className={style.iconBar} />
                </ListItemIcon>
                <ListItemText primary="Menu Config" />
                {openConfig ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openConfig} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleClose();
                    handleCloseNavMenu();
                  }}
                  href="/content/category"
                >
                  <ListItemIcon>
                    <CategoryOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Category" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleClose();
                    handleCloseNavMenu();
                  }}
                  href="/content/product"
                >
                  <ListItemIcon>
                    <LocalMallOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Product" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleClose();
                    handleCloseNavMenu();
                  }}
                  href="/content/table"
                >
                  <ListItemIcon>
                    <GiShoppingCart />
                  </ListItemIcon>
                  <ListItemText primary="Table" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    handleClose();
                    handleCloseNavMenu();
                  }}
                  href="/content/add-on"
                >
                  <ListItemIcon>
                    <TuneOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Product Add-Ons" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton href="/content/order-manager">
                <ListItemIcon>
                  <LaptopIcon className={style.iconBar} />
                </ListItemIcon>
                <ListItemText primary="Order Manager" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon className={style.iconBar} />
                </ListItemIcon>
                <ListItemText primary="Sale Analytics" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
