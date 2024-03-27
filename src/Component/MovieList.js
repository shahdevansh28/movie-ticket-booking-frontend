import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import MoviePost from "./MoviePost";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CenterFocusStrong, Margin } from "@mui/icons-material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function MovieList() {
  const [details, setDetail] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44397/api/Movie").then((response) => {
      console.log(response.data);
      setDetail(response.data);
    });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Container maxWidth style={{ backgroundColor: "transparent" }}>
        <Grid item margin="5px">
          <Typography variant="h4" padding="10px" textAlign="center">
            Recommended Movies
          </Typography>
          <Carousel
            responsive={responsive}
            fullHeightHover={true}
            NextIcon={<ArrowForwardOutlinedIcon />}
            PrevIcon={<ArrowBackOutlinedIcon />}
          >
            {details.map((detail, i) => (
              <MoviePost key={i} data={detail} />
            ))}
          </Carousel>
        </Grid>
      </Container>
    </>
  );
}
