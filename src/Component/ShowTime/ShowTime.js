import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Link, Navigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MenuItem, Select, InputLabel } from "@mui/material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  TextField,
  FormControlLabel,
  Grid,
  Checkbox,
} from "@mui/material";
import Swal from "sweetalert2";
import { baseURL } from "../../API";

export default function ShowTime() {
  const [detail, setDetail] = useState([]);
  const [showtimeData, setShowtimeData] = useState({});
  const [open, setOpen] = React.useState(false);
  //For Date and Time
  const [showDate, setShowDate] = useState(dayjs(Date.now()));
  const [startTime, setStartTime] = useState(dayjs(Date.now()));
  const [endTime, setEndTime] = useState(dayjs(Date.now()));
  //
  const [movieName, setMovieName] = useState([]);
  const [theaterName, setTheaterName] = useState([]);
  //   const d = date.$y + "-" + (date.$M + 1) + "-" + date.$D
  //For validation
  const [amountError, setAmountError] = useState("");
  const [rowError, setRowError] = useState("");
  const [columnError, setColumnError] = useState("");
  const [movieError, setMovieError] = useState("");
  const [theaterError, setTheaterError] = useState("");
  //Fetches list of movies
  useEffect(() => {
    axios.get(`${baseURL}/api/Movie`).then((response) => {
      setMovieName(response.data);
    });
  }, []);
  //Fetches list of theaters
  useEffect(() => {
    axios.get(`${baseURL}/api/Theater`).then((response) => {
      console.log(response.data);
      setTheaterName(response.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  let name, value;
  const onChangeInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setShowtimeData({ ...showtimeData, [name]: value });
  };

  //function to add ShowTime
  const addShowTime = async (e) => {
    let formDirty = false;

    if (!showtimeData.amount || !showtimeData.amount.length) {
      setAmountError("Enter Amount");
      formDirty = true;
    } else {
      let regex = /^\d+$/;
      let amountRes = regex.test(showtimeData.amount);
      if (amountRes) {
        setAmountError("");
      } else {
        setAmountError("Please enter numbers only");
        formDirty = true;
      }
    }
    if (!showtimeData.row || !showtimeData.row.length) {
      setRowError("Enter Total Rows");
      formDirty = true;
    } else {
      let regex = /^\d+$/;
      let rowRes = regex.test(showtimeData.row);
      if (rowRes) {
        setRowError("");
      } else {
        setRowError("Please enter numbers only");
        formDirty = true;
      }
    }
    if (!showtimeData.column || !showtimeData.column.length) {
      setColumnError("Enter Total Columns");
      formDirty = true;
    } else {
      let regex = /^\d+$/;
      let columnRes = regex.test(showtimeData.column);
      if (columnRes) {
        setColumnError("");
      } else {
        setColumnError("Please enter numbers only");
        formDirty = true;
      }
    }

    if (!formDirty) {
      try {
        const res = await axios.post(`${baseURL}/api/ShowTime`, {
          showDate: showDate.toISOString().split("T")[0],
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          amount: showtimeData.amount,
          row: showtimeData.row,
          column: showtimeData.column,
          movieId: showtimeData.movieId,
          theaterId: showtimeData.theaterId,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Showdate has been added successfully",
          showConfirmButton: false,
          timer: 2500,
        });
        Navigate("/admin/ShowTime");
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
      console.log(showtimeData);
      return true;
    } else {
      return false;
    }
  };
  const discardShowTime = (e) => {};

  //Fetches List of ShowTime
  useEffect(() => {
    axios.get(`${baseURL}/api/ShowTime`).then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, []);

  console.log(showDate.$y);

  const setData = (data) => {
    console.log(data);
    localStorage.setItem("showTime", JSON.stringify(data));
    let { id, name, description } = data;
  };
  const getData = () => {
    axios.get(`${baseURL}/api/ShowTime`).then((getData) => {
      setDetail(getData.data);
    });
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseURL}/api/ShowTime/${id}`).then(() => {
          getData();
        });
        Swal.fire({
          title: "Deleted...!",
          text: "Movie has been Deleted...!!",
          icon: "success",
        });
      }
    });
  };
  console.log(detail.forEach((data) => console.log(data.id)));
  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <h3>Shows</h3>

      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
      {/* Form to add ShowTime */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Fill Info Correctly"}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                required
                fullWidth
                name="showDate"
                label="Select Show Date"
                value={showDate}
                minDate={dayjs()}
                onChange={(newValue) => setShowDate(newValue)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="startTime"
                label="Select Start-Time"
                value={startTime}
                minDate={dayjs()}
                onChange={(newValue) => setStartTime(newValue)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                required
                name="endTime"
                fullWidth
                label="Select End-Time"
                value={endTime}
                minDate={dayjs()}
                sx={{ mt: 1 }}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </LocalizationProvider>
            {/*  */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="Amount"
              value={showtimeData.amount}
              onChange={onChangeInput}
              id="amount"
              autoComplete="amount"
              error={amountError && amountError.length ? true : false}
              helperText={amountError}
            />
            <TextField
              margin="row"
              required
              fullWidth
              name="row"
              label="Rows"
              value={showtimeData.row}
              onChange={onChangeInput}
              id="row"
              autoComplete="row"
              error={rowError && rowError.length ? true : false}
              helperText={rowError}
            />
            <TextField
              margin="column"
              required
              fullWidth
              name="column"
              label="Columns"
              value={showtimeData.column}
              onChange={onChangeInput}
              id="column"
              autoComplete="column"
              error={columnError && columnError.length ? true : false}
              helperText={columnError}
            />

            <InputLabel id="movie-name">Select Movie</InputLabel>
            <Select
              required
              fullWidth
              style={{ width: "500px", margin: "5px" }}
              labelId="movie-name-select-label"
              id="movie-name-select"
              value={showtimeData.movieId}
              name="movieId"
              onChange={onChangeInput}
            >
              {movieName.map((data) => {
                return <MenuItem value={data.id}>{data.title}</MenuItem>;
              })}
            </Select>

            <InputLabel id="theater-name">Select Theater</InputLabel>
            <Select
              required
              fullWidth
              style={{ width: "500px", margin: "5px" }}
              labelId="theater-name-select-label"
              id="theater-name-select"
              value={showtimeData.theaterId}
              name="theaterId"
              onChange={onChangeInput}
            >
              {theaterName.map((data) => {
                return (
                  <MenuItem value={data.id}>
                    {data.name},{data.location}
                  </MenuItem>
                );
              })}
            </Select>

            <Button
              onClick={addShowTime}
              id="submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add Show
            </Button>

            <Button
              onClick={discardShowTime}
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Show-Id</TableCell>
            <TableCell>Movie-Name</TableCell>
            <TableCell>Theater</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Show-Date</TableCell>
            <TableCell>Start-Time</TableCell>
            <TableCell>End-Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.map((data) => {
            return (
              <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.movie.title}</TableCell>
                <TableCell>
                  {data.theater.name}, {data.theater.location}
                </TableCell>
                <TableCell>Rs. {data.amount}</TableCell>
                <TableCell>{data.row * data.column} Seats</TableCell>
                <TableCell>{new Date(data.showDate).toDateString()}</TableCell>
                <TableCell>
                  {new Date(data.startTime).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {new Date(data.endTime).toLocaleTimeString()}
                </TableCell>
                <Link to={`/admin/ShowTime/update?showTime=${data.id}`}>
                  <TableCell>
                    <Button onClick={() => setData(data)}>update</Button>
                  </TableCell>
                </Link>
                <TableCell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </TableCell>
                <Link to={`/admin/SeatLayout?showTimeId=${data.id}`}>
                  <TableCell>
                    <Button onClick={() => setData(data)}>View Seats</Button>
                  </TableCell>
                </Link>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
