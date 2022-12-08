import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import loginservice from "../../api/loginservice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const navigate = useNavigate()
  async function handleSubmit(username, password) {
    loginservice(username, password)
      .then((response) => {
        if (response.status !== 200) {
          setAlert(true);
          setAlertContent("Something goes wrong");
        } else {
          return response.json();
        }     
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.access)
          navigate('home')
        }
      })
      .catch((e) => {
        console.log(e);
        setAlert(true);
        setAlertContent("Something goes wrong");
      });
  }
  const pstyle = {
    padding: 20,
    height: "60vh",
    width: 300,
    margin: "100px auto",
  };
  const avatarStyle = { backgroundColor: "#2E8BC0" };
  const tstyle = { margin: "10px 0" };
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          style={tstyle}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={tstyle}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(username, password);
          }}
        >
          Log In
        </Button>
        <Typography style={tstyle}>
          Do you have an account? <Link to="signup">Sign Up</Link>
        </Typography>
        {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
      </Paper>
    </Grid>
  );
}

export default Login;
