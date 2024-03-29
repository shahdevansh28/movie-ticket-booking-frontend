import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Container,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../API";
import NavBar from "../NavBar";
import Footer from "../Footer";

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
      .get(`${baseURL}/api/getBookingByUser?userId=${id}`)
      .then((response) => {
        console.log(response.data);
        setDetail(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/api/Auth/getUser?userId=${id}`).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ padding: "5rem" }}>
        <Grid>
          <Typography variant="h4">Welcome {user.userName}</Typography>
          <Typography variant="h6" style={{ margin: "2rem" }}>
            Your Bookings
          </Typography>
          <Table style={{ padding: "2rem" }}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Booking-Date</TableCell>
                <TableCell>Payment Id</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detail.map((data) => {
                return (
                  <TableRow>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.orderDate}</TableCell>
                    <TableCell>{data.razorPayPaymentId}</TableCell>
                    <TableCell>{data.razorpayOrderID}</TableCell>
                    <TableCell>{data.totalAmount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
