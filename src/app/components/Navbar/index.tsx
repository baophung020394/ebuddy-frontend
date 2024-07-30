"use client";
import { fetchMe, logout } from "@/store/actions";
import { RootState } from "@/store/store";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const Nav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch<any>(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Button color="inherit" component={Link} href="/users">
          Home
        </Button>
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Nav);
