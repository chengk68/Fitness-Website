import { Grid, Paper, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const pstyle = {
    padding: 20,
    height: "60vh",
    width: 800,
    margin: "60px auto",
  };
  const tstyle = { margin: "20px 0" };
  const bstyle = { margin: "100px 0", height: "50px" };
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  const profileURL = "http://localhost:8000/accounts/profile/view/";
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    axios.get(profileURL, config).then((result) => {
      console.log(result);
      setAvatar(result.data.avatar);
      setPhone(result.data.phone);
      setUsername(result.data.user.username);
      setEmail(result.data.user.email);
      setFirst_name(result.data.user.first_name);
      setLast_name(result.data.user.last_name);
    }).catch(error => {
      navigate('/')
    });
  }, []);

  const data = {
    user: {
      first_name,
      last_name,
      email,
    },
    phone,
  };

  const submitChange = () => {
    axios.patch(profileURL, data, config).catch((e) => {
      console.log(e);
    });
  };
  return (
    <Grid>
      <Paper elevation={10} style={pstyle}>
        <Grid container alignItems="stretch" spacing={3}>
          <Grid className="left-pane" item md={7} xs={12}>
            <TextField
              fullWidth
              style={tstyle}
              variant="standard"
              disabled={true}
              value={username}
              label="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              fullWidth
              style={tstyle}
              variant="standard"
              disabled={!editable}
              value={email}
              label="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              fullWidth
              style={tstyle}
              variant="standard"
              disabled={!editable}
              value={first_name}
              label="first name"
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
            />
            <TextField
              fullWidth
              style={tstyle}
              variant="standard"
              disabled={!editable}
              value={last_name}
              label="last name"
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
            />
            <TextField
              fullWidth
              style={tstyle}
              variant="standard"
              disabled={!editable}
              value={phone}
              label="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Grid>
          <Grid className="right-pane" item md={5} xs={12} align="center">
            <img
              id="avatar2"
              src={avatar}
              style={{ objectFit: "cover", borderRadius: "50%" }}
              alt="avatar"
            />
            {!editable ? (
              <Button
                fullWidth
                variant="contained"
                style={bstyle}
                onClick={(e) => {
                  e.preventDefault();
                  setEditable(true);
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                style={bstyle}
                onClick={(e) => {
                  e.preventDefault();
                  setEditable(false);
                  submitChange();
                }}
              >
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Home;
