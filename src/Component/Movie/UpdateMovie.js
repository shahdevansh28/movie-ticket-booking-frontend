import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UpdateMovie() {
  let newObject = localStorage.getItem("movie");
  const [movieData, setMovieData] = useState({});
  const [title, setTitle] = useState();
  const [date, setDate] = React.useState(
    dayjs(JSON.parse(newObject).release_Date)
  );
  const navigate = useNavigate();
  //Validate
  const [nameError, setNameError] = useState("");
  const [durationError, setDurationError] = useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("movieId");

  useEffect(() => {
    setMovieData(JSON.parse(newObject));
    setTitle(movieData.title);
  }, []);

  const updateMovie = async () => {
    //First do validaiton of form
    let formDirty = false;

    if (!movieData.title || !movieData.title.length) {
      setNameError("Movie Name is required");
      formDirty = true;
    } else {
      setNameError("");
    }
    if (!movieData.duration || !movieData.duration.length) {
      setDurationError("Movie duration is required");
      formDirty = true;
    } else {
      let regex = /^\d+$/;
      let durationresult = regex.test(movieData.duration);
      if (durationresult) {
        setDurationError("");
      } else {
        setDurationError("Please enter numbers only");
        formDirty = true;
      }
    }

    if (!formDirty) {
      try {
        const res = await axios.put(`https://localhost:44397/api/Movie/${id}`, {
          Id: id,
          title: movieData.title,
          release_Date: new Date(date).toISOString(),
          duration: movieData.duration,
        });
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Movie has been Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("movie");
        navigate("/admin/Movies");
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
    setMovieData({ ...movieData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <h3>Update Movie</h3>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          name="title"
          autoComplete="duration"
          value={movieData.title}
          onChange={onChangeInput}
          error={nameError && nameError.length ? true : false}
          helperText={nameError}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            required
            fullWidth
            label="Select Release-Date"
            value={date}
            minDate={dayjs()}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>

        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          id="duration"
          name="duration"
          autoComplete="duration"
          value={movieData.duration}
          onChange={onChangeInput}
          error={durationError && durationError.length ? true : false}
          helperText={durationError}
        />
        <br />
        <Button variant="contained" color="primary" onClick={updateMovie}>
          Update Movie
        </Button>
      </Box>
    </div>
  );
}
