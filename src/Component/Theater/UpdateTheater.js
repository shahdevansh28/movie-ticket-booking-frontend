import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";

export default function UpdateTheater() {
  let newObject = localStorage.getItem("theater");
  const [theaterData, setTheaterData] = useState({});
  const [theaterName, setTheaterName] = useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("theaterId");
  const navigate = useNavigate();
  //Validation of form
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    setTheaterData(JSON.parse(newObject));
    setTheaterName(theaterData.name);
  }, []);

  const updateTheater = async () => {
    //First do validaiton of form
    let formDirty = false;

    if (!theaterData.name || !theaterData.name.length) {
      setNameError("Theater Name is required");
      formDirty = true;
    } else {
      setNameError("");
    }
    if (!theaterData.location || !theaterData.location.length) {
      setLocationError("Theate Location is required");
      formDirty = true;
    } else {
      setLocationError("");
    }

    if (!formDirty) {
      try {
        const res = await axios.put(
          `https://localhost:44397/api/Theater/${id}`,
          {
            Id: id,
            name: theaterData.name,
            location: theaterData.location,
          }
        );
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Theater has been Updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("movie");
        navigate("/admin/Theater");
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
    setTheaterData({ ...theaterData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <h3>Update Theater</h3>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          name="name"
          autoComplete="name"
          value={theaterData.name}
          onChange={onChangeInput}
          error={nameError && nameError.length ? true : false}
          helperText={nameError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="location"
          name="location"
          autoComplete="location"
          value={theaterData.location}
          onChange={onChangeInput}
          error={locationError && locationError.length ? true : false}
          helperText={locationError}
        />
        <br />
        <Button variant="contained" color="primary" onClick={updateTheater}>
          Update Movie
        </Button>
      </Box>
    </div>
  );
}
