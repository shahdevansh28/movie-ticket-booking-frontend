import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserProfile() {
  const [detail, setDetail] = useState([]);
  const [user, setUser] = useState({});

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${Cookies.get("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const id = Cookies.get("userId");
  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/get-all-booking?userId=${id}`)
      .then((response) => {
        console.log(response.data);
        setDetail(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:44397/api/Auth/getUser?userId=${id}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
  }, []);

  return (
    <Grid>
      <h2>Welcome {user.userName}</h2>

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
                <TableCell>{new Date(data.bookingDate).toDateString()}</TableCell>
                <TableCell>{data.showTimeId}</TableCell>
                <TableCell>{data.seatId}</TableCell>
                <TableCell>{data.userId}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Grid>
  );
}
