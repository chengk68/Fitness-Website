import { Button, Grid, Paper, TextField, Alert } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom/dist";

function Payment() {
  const { id } = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [postcode, setPostcode] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const navigate = useNavigate();
  const subscribeURL = "http://localhost:8000/subscriptions/subscribe/";
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  const data = {
    subscription_id: id,
    cardNumber,
    expirationDate,
    cvv,
    postcode,
  };

  const handleSubmit = () => {
    axios
      .post(subscribeURL, data, config)
      .then((result) => {
        console.log(result);
        navigate("/subscription");
      })
      .catch((e) => {
        console.log(e);
        setAlert(true);
        setAlertContent("Something goes wrong");
      });
  };
  const pstyle = {
    padding: 20,
    height: "60vh",
    width: 400,
    margin: "20px auto",
  };
  const tstyle = { margin: "10px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={pstyle}>
        <TextField
          label="Card number"
          placeholder="Enter card number"
          fullWidth
          required
          style={tstyle}
          value={cardNumber}
          onChange={(e) => {
            setCardNumber(e.target.value);
          }}
        />
        <TextField
          label="Expiration date"
          placeholder="xxxx-xx-xx"
          fullWidth
          required
          style={tstyle}
          value={expirationDate}
          onChange={(e) => {
            setExpirationDate(e.target.value);
          }}
        />
        <TextField
          label="cvv"
          placeholder="Enter cvv (maximum 5 characters)"
          fullWidth
          required
          style={tstyle}
          value={cvv}
          onChange={(e) => {
            setCvv(e.target.value);
          }}
        />
        <TextField
          label="postcode"
          placeholder="Enter postcode"
          fullWidth
          required
          style={tstyle}
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ margin: "10px 0", height: "60px" }}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Subscribe
        </Button>
        {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
      </Paper>
    </Grid>
  );
}

export default Payment;
