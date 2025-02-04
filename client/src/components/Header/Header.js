import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h5" className="flex-grow text-center">
          🎧 AI DJ App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
