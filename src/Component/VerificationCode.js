import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default function VerificationCode(props) {
  const queryParameters = new URLSearchParams(window.location.search);
  const email = queryParameters.get("mail");
  const [codeError, setCodeError] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  let name, value;
  const onChangeInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const verificationCode = data.get("code");
    //Validate the verification code
    let formDirty = false;
    if (!verificationCode || !verificationCode.length) {
      setCodeError("Please enter verification code");
      formDirty = true;
    } else {
      setCodeError("");
    }

    if (!formDirty) {
      try {
        const res = await axios.post(
          "https://localhost:44397/api/Auth/verify-code",
          {
            mail: email,
            codeByUser: details.code,
          }
        );
        console.log(res.data.status);
        if (res.status === 200) {
          //success move to login page
          Swal.fire({
            icon: "success",
            title: "Your are verified",
          });
          navigate("/login", { replace: true });
        } else if (res.status === 409) {
          //error something wrong
          Swal.fire({
            icon: "error",
            title: "Please enter vaild code",
          });
        } else if (res.status === 400) {
          //error something wrong
          Swal.fire({
            icon: "error",
            title: "Please enter vaild code",
          });
        }
        console.log(res);
      } catch (err) {
        console.log(err.status, err.message);
        if (err.status == 400)
          Swal.fire({
            icon: "error",
            title: "Please enter vaild code",
            timer:5000
          });
      }
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h5" variant="h5">
          Mail has been sent to {email}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="Code"
            name="code"
            autoComplete="code"
            value={details.code}
            onChange={onChangeInput}
            autoFocus
            error={codeError && codeError.length ? true : false}
            helperText={codeError}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
