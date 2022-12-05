import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom/dist";

function Subscribe() {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
  const planURL = "http://localhost:8000/subscriptions/plans/";
  const [plan, setPlan] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(planURL, config)
      .then((result) => {
        console.log(result);
        console.log(result.data);
        setPlan(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Grid container align="center" justifyContent="center">
      {plan !== [] ? (
        plan.map((item) => {
          return (
            <Grid item align="center" md={7} margin="30px">
              <Card>
                <CardActionArea onClick={() => {navigate(`/payment/${item.id}`)}}>
                  <h1>
                    {item.amount}$ / {item.days} days
                  </h1>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })
      ) : (
        <Grid item align="center" md={5} margin="30px">
          <Card>
            <CardContent>There are no subscription plans</CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default Subscribe;
