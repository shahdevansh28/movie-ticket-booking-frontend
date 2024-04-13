import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link, useNavigation } from "react-router-dom";
import ShowList from "./ShowList";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Session from "react-session-api";
import Cookies from "js-cookie";
import NavBar from "./NavBar";
import Swal from "sweetalert2";
import { Container, Grid, Stack } from "@mui/material";
import { baseURL } from "../API";
import Footer from "./Footer";

export default function ConfirmationPage(props) {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [response, setResponse] = useState("");
  const [movieData, setMovieData] = useState({});

  const id = Cookies.get("userId");

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${Cookies.get("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const showId = Session.get("showTimeId");
  useEffect(() => {
    axios
      .get(
        `${baseURL}/api/Movie/api/get-movieByshow?showTimeId=${showId}`
      )
      .then((response) => {
        setMovieData(response.data);
        console.log(movieData.id);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${baseURL}/api/book-ticket?userId=${id}`,
        {
          showTimeId: Session.get("showTimeId"),
          seatNumber: Session.get("seatNumber"),
          bookingDate: new Date(Session.get("bookingDate")).toISOString(),
        }
      );

      setBookingDetails(res);
      console.log(res.data);

      if (res.data.status === 201) {
        window.alert("Seats are not available");
      } else if (res.data.status === 200) {
        console.log("Paymet request is started");

        //make payment request
        try {
          const paymentRes = await axios.post(
            `${baseURL}/intitae-payment?userId=${id}`,
            {
              totalAmount: res.data.totalAmount,
              transactionID: res.data.transactionID,
            }
          );
          console.log(paymentRes.data);
          setOrderDetails(paymentRes.data);

          if (paymentRes.data.status == "created") {
            console.log("Order created");
            var options = {
              key: "rzp_test_MVtbvvIPLifFCR",
              amount: paymentRes.data.amount,
              currency: "INR",
              name: orderDetails.userId,
              description: "Movie Ticket Booking",
              image: "https://example.com/your_logo",
              order_id: paymentRes.data.id,
              handler: function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);

                updatePaymentOnServer(
                  response.razorpay_payment_id,
                  response.razorpay_order_id,
                  "Paid",
                  res.data.selectedSeats,
                  paymentRes.data.bookingOrder
                );
                window.alert("Payment completed...!!!");
                //update status as completed and add booking details
                //call updateDataOnServer
              },
              prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
            });

            rzp1.open();
          }
        } catch (err) {
          if (err.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Not Autherized",
              text: "Please Sign-in",
            });
          }
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        Swal.fire({
          title: "You are not looged in, Please Login",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Login Now",
          denyButtonText: "Go to Home",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate("/login");
          } else if (result.isDenied) {
            navigate("/");
          }
        });
        console.log("Please Login");
      }
      console.log(err);
    }
  };

  const updatePaymentOnServer = async (
    razorpayPaymentID,
    razorpayOrderID,
    status,
    bookedSeats,
    bookingOrder
  ) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/updateOnServer`,
        {
          razorpay_payment_id: razorpayPaymentID,
          razorpay_order_id: razorpayOrderID,
          status: status,
          selectedSeats: bookedSeats,
          bookingOrder: bookingOrder,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack>
      <NavBar />
      <Container style={{ marginTop: "2rem" }}>
        <Typography gutterBottom variant="h5" component="h2">
          Please Confim your booking...
        </Typography>
      </Container>
      <Container
        style={{
          backgroundColor: "red",
          borderRadius: "10px",
          marginTop: "2rem",
          marginBottom: "2rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <Card sx={{ height: "100%", flexDirection: "column" }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h4" component="h4">
              Movie - {orderDetails.totalAmount}
            </Typography>
            <Typography gutterBottom variant="h4" component="h4">
              Total-Amount {movieData.title}
            </Typography>
            <Typography variant="h5" style={{ lineHeight: "40px" }}>
              Duration - {movieData.duration} mins <br />
              Date - {new Date(Session.get("bookingDate")).toDateString()}{" "}
              <br />
              Selected Seats -
              {Session.get("seatNumber").map((data) => {
                return (
                  <Typography>
                    Row :- {data.row} Column :- {data.number}
                  </Typography>
                );
              })}
            </Typography>
          </CardContent>
          <CardActions>
            <Link>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 1, mb: 2 }}
              >
                Confirm Booking
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Container>
      <Footer />
    </Stack>
  );
}
