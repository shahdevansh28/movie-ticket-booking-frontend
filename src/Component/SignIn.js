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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { set } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import { InputLabel } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [details, setDetails] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [unError, setUnError] = useState("");
  const [passwordError, setPasswordError] = React.useState("");
  //const [cookie, setCookie] = useCookies(['user']);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Validate form submission
    const data = new FormData(event.target.value);
    const username = details.username;
    const password = details.password;
    //First do validaiton of form
    let formDirty = false;
    if (!username || !username.length) {
      setUnError("Username is required");
      formDirty = true;
    } else {
      setUnError("");
    }
    if (!password || !password.length) {
      setPasswordError("Password is required");
      formDirty = true;
    } else {
      setPasswordError("");
    }

    if (!formDirty) {
      try {
        const res = await axios.post("https://localhost:44397/api/Auth/Login", {
          username: details.username,
          password: details.password,
        });
        console.log(res);
        if (res.status == 401) {
          alert("Not found");
          Swal.fire({
            icon: "error",
            title: "Not Autherized",
            text: "Unvalide username and password",
          });
        } else if (res.status === 200) {
          Cookies.set("token", res.data.token);
          Cookies.set("userId", res.data.user.id);
          const decoded = jwtDecode(res.data.token);
          if (
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] == "User"
          ) {
            Swal.fire({
              icon: "success",
              title: "Welcome...!!!",
              text: "Username and password are correct...<br> Please Refresh the Home-page",
            });
            // window.location.reload();

            navigate("/");
          } else if (
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] == "Admin"
          ) {
            navigate("/admin");
          }
        }
      } catch (err) {
        if (err.response.status == 401) {
          Swal.fire({
            icon: "error",
            title: "Not Autherized",
            text: "Unvalide username and password",
          });
          setDetails({ username: "", password: "" });
        }
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
    setDetails({ ...details, [name]: value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container>
        <Grid item xs={6}>
          <img
            className="profile-photo"
            src={"/bg-img/sign-in-bg-img.jpg"}
            alt={"Login Page-Image"}
            width={940}
            height={720}
          />
        </Grid>
        <Grid item xs={6}>
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
              <Avatar sx={{ m: 2, bgcolor: "#000000" }}>
                <LoginIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

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
                  id="username"
                  label="UserName"
                  name="username"
                  autoComplete="username"
                  value={details.username}
                  onChange={onChangeInput}
                  autoFocus
                  error={unError && unError.length ? true : false}
                  helperText={unError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={details.password}
                  onChange={onChangeInput}
                  id="password"
                  autoComplete="current-password"
                  error={passwordError && passwordError.length ? true : false}
                  helperText={passwordError}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
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
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
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
