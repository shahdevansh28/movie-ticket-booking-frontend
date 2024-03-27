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
import Cookies from "js-cookie";
import { baseURL } from "../../API";

export default function Movie() {
  const [detail, setDetail] = useState([]);

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${Cookies.get("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    axios.get(`${baseURL}/api/get-all-booking`).then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, []);

  //   console.log(new Date(date).toISOString());

  const setData = (data) => {
    console.log(data);
    let { id, name, description } = data;
  };

  console.log(detail.forEach((data) => console.log(data.id)));
  return (
    <div sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Booking-Date</TableCell>
            <TableCell>ShowTime Id</TableCell>
            <TableCell>Seat ID</TableCell>
            <TableCell>UserID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.map((data) => {
            return (
              <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.bookingDate}</TableCell>
                <TableCell>{data.showTimeId}</TableCell>
                <TableCell>{data.seatId}</TableCell>
                <TableCell>{data.userId}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
