import { Alert, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import signupservice from "../../api/signupservice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false)
  const [alertContent, setAlertContent] = useState("")
  const fileInputRef = useRef();
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
    height: "90vh",
  };
  const tstyle = { margin: "20px 0" };

  async function handleSubmit(
    username,
    password,
    email,
    avatar,
    phone,
    first_name,
    last_name
  ) {
    signupservice(
      username,
      password,
      email,
      avatar,
      phone,
      first_name,
      last_name
    ).then((success) => {
      if (success) {
        console.log("success");
        navigate("/")
      } else {
        console.log("failed")
        setAlert(true)
        setAlertContent("Something goes wrong!")
      }
    }).catch((e) => {
      console.log(e)
    })
  }

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account
          </Typography>
        </Grid>
        <form align="center">
          {preview ? (
            <img id="avatar" src={preview} style={{ objectFit: "cover" }} alt="avatar" />
          ) : (
            <button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              Add Avatar
            </button>
          )}
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            ref={fileInputRef}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
          <TextField
            fullWidth
            label="username"
            variant="standard"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <TextField
            fullWidth
            label="password"
            variant="standard"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <TextField
            fullWidth
            label="email"
            variant="standard"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <TextField
            fullWidth
            label="first name"
            variant="standard"
            placeholder="first name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
          <TextField
            fullWidth
            label="last name"
            variant="standard"
            placeholder="last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
          <TextField
            fullWidth
            label="phone"
            variant="standard"
            placeholder="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={tstyle}
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(
                username,
                password,
                email,
                image,
                phone,
                firstName,
                lastName
              );
            }}
          >
            Sign Up
          </Button>
        </form>
        {alert ? <Alert severity="error">{alertContent}</Alert>: <></>}
      </Paper>
    </Grid>
  );
}

export default Signup;
