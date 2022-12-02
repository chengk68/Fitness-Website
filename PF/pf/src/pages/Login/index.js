import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./style.css";
import {Link} from "react-router-dom";

function Login() {
  const pstyle = {
    padding: 20,
    height: "60vh",
    width: 300,
    margin: "100px auto"
  };
  const avatarStyle = { backgroundColor: "#2E8BC0" };
  const tstyle={margin:'10px 0'}
  return (
    <Grid>
      <Paper elevation={10} style={pstyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
		  style={tstyle}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
		  style={tstyle}
        />
        <Button type="submit" color="primary" variant="contained" fullWidth style={tstyle}>
          Log In
        </Button>
		<Typography style={tstyle}>
			Do you have an account ?
			<Link to="/signup">
				Sign Up
			</Link>
		</Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
