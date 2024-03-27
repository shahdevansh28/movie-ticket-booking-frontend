import { FitScreen } from "@mui/icons-material";
import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <Container>
        <Grid container alignItems="center">
          <img src="bg-img/404.png" height="720px" />
          <Typography variant="h4" align="center" padding={10}>
            Page Not Found
            <br />
            <Button
              style={{
                borderRadius: 30,
                backgroundColor: "#FFBF00",
              }}
              variant="outline"
            >
              <Link to="/">Go to Home</Link>
            </Button>
          </Typography>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
