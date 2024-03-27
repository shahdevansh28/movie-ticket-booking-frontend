import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Seat from "./Seat";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import Session from "react-session-api";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { baseURL } from "../API";

export default function SeatLayout() {
  const [details, setDetail] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [rows, setRows] = useState(0);

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("showId");
  Session.set("showTimeId", id);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/Seat/seat-layout?showTimeId=${id}`)
      .then((response) => {
        console.log(response.data);
        setDetail(response.data);
      });
  }, []);

  const sendData = (seat) => {
    console.log(seat.data.row);
    var obj = {
      row: seat.data.row,
      number: seat.data.number,
    };
    setSeatData([...seatData, obj]);
  };

  console.log(seatData);
  const defaultTheme = createTheme();

  const onClick = () => {
    Session.set("seatNumber", seatData);
    console.log(seatData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid
          container
          style={{
            backgroundColor: "#D3D3D3",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          Screen
        </Grid>
        <Grid container>
          {details.map((detail) => (
            <>
              <Grid xs={8} sm={6} md={4}>
                <Seat data={detail} sendData={sendData} />
                <Divider sx={{ opacity: 1 }} />
              </Grid>
            </>
          ))}
        </Grid>
        <Link to="/confirm-booking">
          <Button
            variant="contained"
            fullWidth="true"
            color="primary"
            onClick={onClick}
          >
            Book Now
          </Button>
        </Link>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
