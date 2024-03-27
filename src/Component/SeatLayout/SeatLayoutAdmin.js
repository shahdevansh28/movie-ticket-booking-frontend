import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import Session from "react-session-api";
import Seat from "../Seat";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Checkbox,
} from "@mui/material";
export default function SeatLayoutAdmin(props) {
  const [details, setDetail] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [showTimeData, setShowTimeData] = useState({});
  const [tmp, setTmp] = useState(false);
  const [open, setOpen] = useState(false);
  const [seatLayoutData, setSeatLayoutData] = useState({});

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("showTimeId");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addSeatLayout = async () => {
    console.log("Add");
    try {
      const res = await axios.post(
        "https://localhost:44397/api/Seat/add-seat",
        {
          totalRow: seatLayoutData.totalRow,
          totalCol: seatLayoutData.totalCol,
          showTimeId: id,
          isAvailable: false,
        }
      );
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    console.log(seatLayoutData);
  };

  const discardSeatLayout = (e) => {
    e.target.parentElement.reset();
    setSeatLayoutData({});
    console.log(seatLayoutData);
  };

  let name, value;
  const onChangeInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSeatLayoutData({ ...seatLayoutData, [name]: value });
  };

  useEffect(() => {
    axios.get(`https://localhost:44397/api/ShowTime/${id}`).then((response) => {
      console.log(response.data);
    });
  }, [seatLayoutData]);

  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/Seat/seat-layout?showTimeId=${id}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0) {
          setShowTimeData(response.data);
          setTmp(false);
        } else {
          setTmp(true);
        }
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

  const onClick = () => {};

  return (
    <>
      <h1>{showTimeData.showDate}</h1>

      {tmp ? (
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container columns={{ xs: 4, md: 12 }}>
            {details.map((detail) => (
              <>
                <Grid xs={6} sm={6}>
                  <Seat data={detail} sendData={sendData} />
                </Grid>
              </>
            ))}
          </Grid>
        </Container>
      ) : (
        <div style={{ m: 2 }}>
          <Button variant="contained" onClick={handleClickOpen}>
            Add SeatLayout
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Fill information for SeatLayout..."}
            </DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  type="number"
                  fullWidth
                  id="totalRow"
                  label="Enter Total Rows"
                  name="totalRow"
                  autoComplete="totalRow"
                  value={seatLayoutData.totalRow}
                  onChange={onChangeInput}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="totalCol"
                  label="Enter Total Columns"
                  type="number"
                  value={seatLayoutData.totalCol}
                  onChange={onChangeInput}
                  id="totalCol"
                  autoComplete="current-password"
                />
                <Button
                  onClick={addSeatLayout}
                  id="submit"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Add SeatLayout
                </Button>

                <Button
                  onClick={discardSeatLayout}
                  id="submit"
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  Discard
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
