import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";

function Subscription() {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  const futurePaymentURL = "http://localhost:8000/subscriptions/futurePayment/";
  const paymentHistoryURL =
    "http://localhost:8000/subscriptions/paymentHistory/";
  const cancelURL = "http://localhost:8000/subscriptions/cancel/";
  const navigate = useNavigate();
  const [futurePayment, setFuturePayment] = useState({});
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showFuturePayment, setShowFuturePayment] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    axios
      .get(futurePaymentURL, config)
      .then((result) => {
        console.log(result.data);
        setFuturePayment(result.data);
        setShowFuturePayment(true);
      })
      .catch((e) => {
        console.log(e);
        setShowFuturePayment(false);
      });

    axios
      .get(paymentHistoryURL, config)
      .then((result) => {
        setPaymentHistory(result.data.results);
        console.log(paymentHistory)
        setShowHistory(true);
      })
      .catch((e) => {
        console.log(e);
        setShowHistory(false);
      });
  }, []);

  const handleCancel = () => {
    axios.delete(cancelURL, config).catch((e) => {
      console.log(e);
    });
    setShowFuturePayment(false);
  };

  return (
    <Grid container alignItems="stretch" spacing={3}>
      <Grid className="left-pane" item md={4} xs={12}>
        <Card style={{ margin: "30px" }}>
          <Button
            style={{ margin: "30px", width: "85%" }}
            variant="contained"
            onClick={()=>{ navigate('/subscribe')}}
          >
            Subscribe
          </Button>
          <Button
            style={{ margin: "30px", width: "85%" }}
            variant="contained"
            color="success"
            onClick={()=> {navigate('/cardInfo')}}
          >
            Card Information
          </Button>
          <Button
            style={{ margin: "30px", width: "85%" }}
            variant="contained"
            color="error"
            onClick={handleCancel}
          >
            Cancel Subscription
          </Button>
        </Card>
        <Card style={{ margin: "30px" }}>
          <CardHeader title="Future Payment" />
          {showFuturePayment ? (
            <CardContent>
              <b>Amount: </b> {futurePayment.amount} <br />
              <b>Card Number: </b> {futurePayment.cardInfo.cardNumber} <br />
              <b>Expiration Date: </b> {futurePayment.cardInfo.expirationDate}{" "}
              <br />
              <b>Postcode: </b> {futurePayment.cardInfo.postcode} <br />
              <b>Time: </b> {futurePayment.time}
            </CardContent>
          ) : (
            <CardContent>There are no future payment</CardContent>
          )}
        </Card>
      </Grid>
      <Grid className="right-pane" item md={6} xs={12}>
        <h2 style={{ margin: "30px" }}>Payment History</h2>
        {showHistory ? (
          paymentHistory.map((history) => {
            return (
              <Card style={{ margin: "30px" }}>
                <CardContent>
                  <b>Amount: </b> {history.amount} <br />
                  <b>Card Number: </b> {history.cardNumber} <br />
                  <b>Expiration Date: </b> {history.expirationDate} <br />
                  <b>Postcode: </b> {history.postcode} <br />
                  <b>Time: </b> {history.time}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card style={{ margin: "30px" }}>
            <CardContent>There are no payment history</CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}

export default Subscription;
