import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

function Signup() {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
    height: "80vh",
  };
  const tstyle = { margin: "50px 0" };

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
            <img src={preview} style={{ objectFit: "cover" }} alt="avatar" />
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
          />
          <TextField
            fullWidth
            label="password"
            variant="standard"
            placeholder="password"
          />
          <TextField
            fullWidth
            label="email"
            variant="standard"
            placeholder="email"
          />
          <TextField
            fullWidth
            label="first name"
            variant="standard"
            placeholder="first name"
          />
          <TextField
            fullWidth
            label="last name"
            variant="standard"
            placeholder="last name"
          />
          <TextField
            fullWidth
            label="phone"
            variant="standard"
            placeholder="phone"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={tstyle}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Signup;
