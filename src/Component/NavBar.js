import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const pages = ["movies"];
  const auth = Cookies.get("token");
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("token");
    navigate("/");
    setAnchorEl(null);
  };

  const handleProfile = () => {
    redirect("/Profile");
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{ backgroundColor: "#FFFFFF", boxShadow: "none" }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                color="inherit"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <Link color="inherit" to="/">
                  Book-Your-Show
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    sx={{ my: 1, px: 5, color: "white", display: "block" }}
                  >
                    <Link to={`/${page}`}>{page}</Link>
                  </Button>
                ))}
              </Box>
              {auth ? (
                <div>
                  <Link to="/Profile">
                    <Button color="secondary">Profile</Button>
                  </Link>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="black"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <Button color="secondary">
                    <Link to="/login">login</Link>
                  </Button>
                  <Button color="secondary">
                    <Link to="/register">register</Link>
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        {/* <Outlet /> */}
      </Grid>
    </Grid>
  );
}
