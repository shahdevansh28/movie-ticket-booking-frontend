import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Chip, Stack } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import { baseURL } from "../../API";
import Swal from "sweetalert2";

export default function Theater() {
  const [detail, setDetail] = useState([]);
  const [theaterData, setTheaterData] = useState({});
  const [open, setOpen] = React.useState(false);
  //Validat form
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTheater = async () => {
    let formDirty = false;

    if (!theaterData.theaterName || !theaterData.theaterName.length) {
      setNameError("Theater Name is required");
      formDirty = true;
    } else {
      setNameError("");
    }
    if (!theaterData.location || !theaterData.location.length) {
      setLocationError("Theater Location is required");
      formDirty = true;
    } else {
      setLocationError("");
    }

    if (!formDirty) {
      try {
        const res = await axios.post(`${baseURL}/api/Theater`, {
          name: theaterData.theaterName,
          location: theaterData.location,
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Theater has been added successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        Navigate("/api/Theater");
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
      console.log(theaterData);
      return true;
    } else {
      return false;
    }
  };

  const discardTheater = (e) => {
    e.target.parentElement.reset();
    setTheaterData({});
    console.log(theaterData);
  };

  let name, value;
  const onChangeInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setTheaterData({ ...theaterData, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/Theater/api/get-show-by-theater`)
      .then((response) => {
        console.log(response.data);
        setDetail(response.data);
      });
  }, []);

  const setData = (data) => {
    console.log(data);
    // let { id, name, description } = data;
    localStorage.setItem("theater", JSON.stringify(data));
  };

  const getData = () => {
    axios.get(`${baseURL}/api/Theater`).then((getData) => {
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
        axios.delete(`${baseURL}/api/Theater/${id}`).then(() => {
          getData();
        });
        Swal.fire({
          title: "Deleted...!",
          text: "Theater has been Deleted...!!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <h3>Theater</h3>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
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
              id="theaterName"
              label="Theater Name"
              name="theaterName"
              autoComplete="theaterName"
              value={theaterData.theaterName}
              onChange={onChangeInput}
              autoFocus
              error={nameError && nameError.length ? true : false}
              helperText={nameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="location"
              label="Location"
              type="location"
              value={theaterData.location}
              onChange={onChangeInput}
              id="location"
              autoComplete="location"
              error={locationError && locationError.length ? true : false}
              helperText={locationError}
            />
            <Button
              onClick={addTheater}
              id="submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add Theater
            </Button>

            <Button
              onClick={discardTheater}
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

      {detail.map((data) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Stack direction="row" spacing={1}>
                <Chip label={data.theater.id} variant="outlined" />
                <Chip label={data.theater.name} variant="outlined" />
                <Chip label={data.theater.location} variant="outlined" />
              </Stack>

              <Link to={`/admin/Theater/update?theaterId=${data.theater.id}`}>
                <Button onClick={() => setData(data.theater)}>update</Button>
              </Link>
              <Button onClick={() => onDelete(data.theater.id)}>Delete</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Show-Id</TableCell>
                    <TableCell>Movie-Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Show-Date</TableCell>
                    <TableCell>Start-Time</TableCell>
                    <TableCell>End-Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.showTimes.map((data) => {
                    return (
                      <TableRow>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.movieId}</TableCell>
                        <TableCell>Rs. {data.amount}</TableCell>
                        <TableCell>{data.capacity} Seats</TableCell>
                        <TableCell>
                          {new Date(data.showDate).toDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(data.startTime).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          {new Date(data.endTime).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
