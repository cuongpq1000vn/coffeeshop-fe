"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import style from "../style/navbar.module.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Badge from "@mui/material/Badge";
import LaptopIcon from "@mui/icons-material/Laptop";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import WidgetsIcon from "@mui/icons-material/WidgetsOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Fade from "@mui/material/Fade";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Link from "next/link";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { GiShoppingCart } from "react-icons/gi";
import SideBar from "@/components/molecules/SideBar";

function ResponsiveAppBar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutSubmit = async () => {
    await logout();
    router.refresh();
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#161b22",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Lexend",
              fontWeight: 700,
              textDecoration: "none",
              color: "#bcbc0e",
            }}
          >
            CODEZX
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Lexend Exa",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            COFFEE SHOP
          </Typography>
          <SideBar
            handleOpenNavMenu={handleOpenNavMenu}
            handleCloseNavMenu={handleCloseNavMenu}
            handleClose={handleClose}
            anchorElNav={anchorElNav}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            className={style.codezx}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CODEZX
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              className={style.pagec}
              href="/content/dashboard"
            >
              <WidgetsIcon className={style.iconBar} /> Dashboard
            </Button>
            <div>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleClick}
                className={style.pagec}
              >
                <LocalMallOutlinedIcon className={style.iconBar} /> Menu Config
                <KeyboardArrowDownIcon className={style.iconBar} />
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <Link href="/content/category" className={style.iconNavBar}>
                  <MenuItem onClick={handleClose}>
                    <CategoryOutlinedIcon /> Category
                  </MenuItem>
                </Link>
                <Link href="/content/product" className={style.iconNavBar}>
                  <MenuItem onClick={handleClose}>
                    <LocalMallOutlinedIcon /> Product
                  </MenuItem>
                </Link>
                <Link href="/content/table" className={style.iconNavBar}>
                  <MenuItem onClick={handleClose}>
                    <GiShoppingCart /> Table
                  </MenuItem>
                </Link>
                <Link href="/content/add-on" className={style.iconNavBar}>
                  <MenuItem onClick={handleClose}>
                    <TuneOutlinedIcon /> Product Add-Ons
                  </MenuItem>
                </Link>
              </Menu>
            </div>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              className={style.pagec}
              href="/content/order-manager"
            >
              <LaptopIcon className={style.iconBar} /> Order Manager
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              className={style.pagec}
            >
              <BarChartIcon className={style.iconBar} /> Sales Analytics
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton size="large" aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="search" color="inherit">
              <QuestionMarkIcon />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem onClick={logoutSubmit}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
