import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CardInfo() {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [postcode, setPostcode] = useState("");
  const [editable, setEditable] = useState(false);
  const [showCardInfo, setShowCardInfo] = useState(false);
  const pstyle = {
    padding: 20,
    height: "60vh",
    width: 400,
    margin: "20px auto",
  };
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  const cardInfoURL = "http://localhost:8000/subscriptions/cardInfo/";
  useEffect(() => {
    axios
      .get(cardInfoURL, config)
      .then((result) => {
        setCardNumber(result.data.cardNumber);
        setExpirationDate(result.data.expirationDate);
        setCvv(result.data.cvv);
        setPostcode(result.data.postcode);
        setShowCardInfo(true);
      })
      .catch((e) => {
        console.log(e);
        setShowCardInfo(false);
      });
  }, []);

  const data = {
    cardNumber,
    expirationDate,
    cvv,
    postcode,
  };
  const submitChange = () => {
    axios.put(cardInfoURL, data, config).catch((e) => {
      console.log(e);
    });
  };
  const tstyle = { margin: "10px 0" };
  return (
    <Grid>
      {showCardInfo ? (
        <Paper elevation={10} style={pstyle}>
          <TextField
            label="Card number"
            placeholder="Enter card number"
            fullWidth
            style={tstyle}
            variant="standard"
            disabled={!editable}
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
          />
          <TextField
            label="Expiration date"
            placeholder="xxxx-xx-xx"
            fullWidth
            variant="standard"
            disabled={!editable}
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
            variant="standard"
            disabled={!editable}
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
            variant="standard"
            disabled={!editable}
            style={tstyle}
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value);
            }}
          />
          {!editable ? (
            <Button
              fullWidth
              variant="contained"
              style={tstyle}
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
              style={tstyle}
              onClick={(e) => {
                e.preventDefault();
                setEditable(false);
                submitChange();
              }}
            >
              Save
            </Button>
          )}
        </Paper>
      ) : (
        <Paper elevation={10} style={pstyle}>
          <p>There are no card information. Please subscribe first</p>
        </Paper>
      )}
    </Grid>
  );
}

export default CardInfo;
