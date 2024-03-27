import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";

export default function UpdateShowTime() {
  let newObject = localStorage.getItem("showTime");
  const [showData, setShowData] = useState({});
  //const [title, setTitle] = useState();
  //For Date and Time
  const [showDate, setShowDate] = useState(
    dayjs(JSON.parse(newObject).showDate)
  );
  const [startTime, setStartTime] = useState(
    dayjs(JSON.parse(newObject).startTime)
  );
  const [endTime, setEndTime] = useState(dayjs(JSON.parse(newObject).endTime));
  //
  const [movieName, setMovieName] = useState([]);
  const [theaterName, setTheaterName] = useState([]);
  const navigate = useNavigate();
  //Validate
  const [nameError, setNameError] = useState("");
  const [durationError, setDurationError] = useState("");
  //For validation
  const [amountError, setAmountError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [movieError, setMovieError] = useState("");
  const [theaterError, setTheaterError] = useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("showTime");

  useEffect(() => {
    setShowData(JSON.parse(newObject));
    //setTitle(movieData.title);
  }, []);
  //Fetches list of movies
  useEffect(() => {
    axios.get("https://localhost:44397/api/Movie").then((response) => {
      setMovieName(response.data);
    });
  }, []);
  //Fetches list of theaters
  useEffect(() => {
    axios.get("https://localhost:44397/api/Theater").then((response) => {
      console.log(response.data);
      setTheaterName(response.data);
    });
  }, []);

  const updateShow = async (e) => {
    //First do validaiton of form
    let formDirty = false;

    if (!showData.amount || !showData.amount.length) {
      setAmountError("Enter Amount");
      formDirty = true;
    } else {
      let regex = /^\d+$/;
      let amountRes = regex.test(showData.amount);
      if (amountRes) {
        setAmountError("");
      } else {
        setAmountError("Please enter numbers only");
        formDirty = true;
      }
    }
    if (!showData.capacity || !showData.capacity.length) {
      setCapacityError("Enter Seating Capacity");
      formDirty = true;
    } else {
      let regex = /^\d+$/;
      let capacityRes = regex.test(showData.capacity);
      if (capacityRes) {
        setCapacityError("");
      } else {
        setCapacityError("Please enter numbers only");
        formDirty = true;
      }
    }

    if (!formDirty) {
      try {
        const res = await axios.put(
          `https://localhost:44397/api/ShowTime/${id}`,
          {
            Id: id,
            showDate: new Date(showDate).toISOString(),
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            amount: showData.amount,
            capacity: showData.capacity,
            movieId: showData.movieId,
            theaterId: showData.theaterId,
          }
        );
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Show has been Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/ShowTime");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      return true;
    } else {
      return false;
    }
  };

  let name, value;
  const onChangeInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setShowData({ ...showData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <h3>Update Movie</h3>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {/* Date */}
        <InputLabel id="show-date">Select Show Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            fullWidth
            name="showDate"
            value={showDate}
            minDate={dayjs()}
            onChange={(newValue) => setShowDate(newValue)}
          />
        </LocalizationProvider>
        <InputLabel id="start-time">Select Show Start Time</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            name="startTime"
            value={startTime}
            minDate={dayjs()}
            onChange={(newValue) => setStartTime(newValue)}
          />
        </LocalizationProvider>
        <InputLabel id="end-time">Select Show End Time</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            required
            name="endTime"
            fullWidth
            value={endTime}
            minDate={dayjs()}
            sx={{ mt: 1 }}
            onChange={(newValue) => setEndTime(newValue)}
          />
        </LocalizationProvider>
        {/*  */}
        <InputLabel id="Amount">Ticket Amount</InputLabel>
        <TextField
          margin="normal"
          required
          fullWidth
          name="amount"
          value={showData.amount}
          onChange={onChangeInput}
          id="amount"
          autoComplete="amount"
          error={amountError && amountError.length ? true : false}
          helperText={amountError}
        />
        <InputLabel id="Capacity">Seating Capacity</InputLabel>
        <TextField
          margin="capacity"
          required
          fullWidth
          name="capacity"
          value={showData.capacity}
          onChange={onChangeInput}
          id="capacity"
          autoComplete="capacity"
          error={capacityError && capacityError.length ? true : false}
          helperText={capacityError}
        />

        <InputLabel id="movie-name">Select Movie</InputLabel>
        <Select
          required
          fullWidth
          style={{ width: "500px", margin: "5px" }}
          labelId="movie-name-select-label"
          id="movie-name-select"
          value={showData.movieId}
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
          value={showData.theaterId}
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
          onClick={updateShow}
          id="submit"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Update Show
        </Button>
      </Box>
    </div>
  );
}
