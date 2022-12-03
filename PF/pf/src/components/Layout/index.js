import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
	  <AppBar position="static">
		<Toolbar>
			<Typography variant="h6" style={{flexGrow: 1}} >
				AppBar
			</Typography>
			<IconButton color="inherit" size="small" sx={{width: "70px", height: "70px"}}>
				<Link to="/home" style={{'textDecoration': 'none', color: "white"}}>Home</Link>
			</IconButton>
			<IconButton color="inherit" size="small" sx={{width: "70px", height: "70px"}}>
				<Link to="/studio" style={{'textDecoration': 'none', color: "white"}}>Studio</Link>
			</IconButton>
		</Toolbar>
	  </AppBar>
	  <Outlet />
    </>
  );
}

export default Layout;