import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { baseURL } from "../API";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  //For Validation
  const [unError, setUnError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    //First do validaiton of form
    let formDirty = false;
    if (!username || !username.length) {
      setUnError("Username is required");
      formDirty = true;
    } else {
      if (username.length < 5 || username.length > 10) {
        setUnError("Username lenght must be 5-10 characters.");
        formDirty = true;
      } else {
        setUnError("");
      }
    }
    if (!email || !email.length) {
      setEmailError("Email is required");
      formDirty = true;
    } else {
      let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      let result = regex.test(email);
      if (result) {
        setEmailError("");
      } else {
        setEmailError("Invalid email id");
        formDirty = true;
      }
    }
    if (!password || !password.length) {
      setPasswordError("Password is required");
      formDirty = true;
    } else {
      if (password.length < 6 || password.length > 20) {
        setPasswordError(
          "Password must be between 6 and 20 characters in length"
        );
        formDirty = true;
      } else {
        const regex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
        let result = regex.test(password);
        if (result) {
          setPasswordError("");
        } else {
          setPasswordError(
            "Must conatin a digit, a lowercase English character, an uppercase English character, a special character."
          );
          formDirty = true;
        }
      }
    }

    if (!formDirty) {
      //Do Siginup
      console.log("Make request");
      try {
        const res = await axios.post(`${baseURL}/api/Auth/Register`, {
          username: username,
          email: email,
          password: password,
        });
        //navigate(`/verify-code?mail=${data.get("email")}`);
        console.log(res);
        if (res.status === 200) {
          console.log("Email has been sent successfully");
          Swal.fire({
            icon: "success",
            title: "Verification Link has been sent to " + email,
            text: "Please click on link in your email to verify your-self",
            showConfirmButton: true,
          });
          navigate("/login", { replace: true });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            showConfirmButton: true,
            timer: 2000,
          });
          window.location.reload();
        }
      } catch (err) {
        if (err.response.status === 409)
          Swal.fire({
            icon: "error",
            title: "Username and email already exists.",
            text: "Please Login...",
            showConfirmButton: true,
            confirmButtonText: "Login Here",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        if (err.response.status === 500) {
        }
        console.log(err.response.status);
      }
      return true;
    } else {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Something went wrong! <br> Please Check your details.",
      //   footer: '<a href="/signup">Why do I have this issue?</a>',
      // });
      return false;
    }
    //if everything is good
    //make request
    //else return false
    // try {
    //   const res = await axios.post(
    //     "https://localhost:44397/api/Auth/Register",
    //     {
    //       username: username,
    //       email: email,
    //       password: password,
    //     }
    //   );
    //   navigate(`/verify-code?mail=${data.get("email")}`);
    //   console.log(res);
    // } catch (err) {
    //   console.log(err.response.status);
    // }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container>
        <Grid
          item
          style={{
            backgroundColor: "#FFFFF0",
            fontSize: "18px",
            padding: "0px 50px 0px 50px",
          }}
          xs={6}
        >
          <img
            className="profile-photo"
            src={"/bg-img/sign-up-bg-img.png"}
            alt={"SignUp Page-Image"}
            width={800}
            height={730}
          />
        </Grid>
        <Grid item xs={6}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 2, bgcolor: "#000000" }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography component="h6" variant="h4">
                SIGN UP
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="userName"
                      label="User Name"
                      autoFocus
                      error={unError && unError.length ? true : false}
                      helperText={unError}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={emailError && emailError.length ? true : false}
                      helperText={emailError}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      helperText={passwordError}
                      error={
                        passwordError && passwordError.length ? true : false
                      }
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
                <Button
                  style={{
                    borderRadius: 30,
                    backgroundColor: "#FFBF00",
                    fontSize: "18px",
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
