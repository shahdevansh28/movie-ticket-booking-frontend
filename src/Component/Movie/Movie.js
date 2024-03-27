import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

export default function Movie() {
  const [detail, setDetail] = useState([]);
  const [movieData, setMovieData] = useState({});

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayjs(Date.now()));
  //Validate
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [durationError, setDurationError] = useState("");

  const d = date.$y + "-" + (date.$M + 1) + "-" + date.$D;
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
    setMovieData({ ...movieData, [name]: value });
  };

  const addMovie = async (e) => {
    const movieName = movieData.movieName;
    const duration = movieData.duration;
    const releaseDate = date;

    //First do validaiton of form
    let formDirty = false;

    if (!movieName || !movieName.length) {
      setNameError("Movie Name is required");
      formDirty = true;
    } else {
      setNameError("");
    }
    if (!duration || !duration.length) {
      setDurationError("Movie duration is required");
      formDirty = true;
    } else {
      let regex = /^\d+$/;
      let durationresult = regex.test(duration);
      if (durationresult) {
        setDurationError("");
      } else {
        setDurationError("Please enter numbers only");
        formDirty = true;
      }
    }

    console.log(formDirty);
    if (!formDirty) {
      try {
        const res = await axios.post("https://localhost:44397/api/Movie", {
          title: movieData.movieName,
          release_Date: new Date(date).toISOString(),
          duration: movieData.duration,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Movie has been added successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        console.log(res);
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
      return true;
    } else {
      return false;
    }

    console.log(movieData);
  };
  const discardMovie = (e) => {};

  useEffect(() => {
    axios.get("https://localhost:44397/api/Movie").then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, []);

  console.log(new Date(date).toISOString());

  const setData = (data) => {
    console.log(data);
    // let { id, name, description } = data;
    localStorage.setItem("movie", JSON.stringify(data));
  };

  const getData = () => {
    axios.get("https://localhost:44397/api/Movie").then((getData) => {
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
        axios.delete(`https://localhost:44397/api/Movie/${id}`).then(() => {
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
      <h3>Movies</h3>

      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>

      {/* Form to add movie data */}
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="movieName"
              label="Movie Name"
              name="movieName"
              autoComplete="movieName"
              value={movieData.theaterName}
              onChange={onChangeInput}
              autoFocus
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
                error={dateError && dateError.length ? true : false}
                helperText={dateError}
              />
            </LocalizationProvider>

            <TextField
              margin="normal"
              required
              fullWidth
              id="duration"
              label="Duration (in mins)"
              name="duration"
              autoComplete="duration"
              value={movieData.duration}
              onChange={onChangeInput}
              autoFocus
              error={durationError && durationError.length ? true : false}
              helperText={durationError}
            />

            <Button
              onClick={addMovie}
              id="submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add Movie
            </Button>

            <Button
              onClick={discardMovie}
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
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.map((data) => {
            return (
              <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>
                  {new Date(data.release_Date).toDateString()}
                </TableCell>
                <TableCell>{data.duration} Mins</TableCell>
                <Link to={`/admin/Movies/update?movieId=${data.id}`}>
                  <TableCell>
                    <Button onClick={() => setData(data)}>update</Button>
                  </TableCell>
                </Link>
                <TableCell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
