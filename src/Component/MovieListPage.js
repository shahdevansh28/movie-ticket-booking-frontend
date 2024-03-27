import React from "react";
import NavBar from "./NavBar";
import HomePageCarousel from "./HomePageCarousel";
import MovieList from "./MovieList";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import MoviePost from "./MoviePost";
import { baseURL } from "../API";

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}/api/Movie`).then((response) => {
      console.log(response.data);
      setMovies(response.data);
    });
  }, []);
  return (
    <>
      <Stack>
        <NavBar />
        <Typography variant="h5" textAlign="left" margin="1.5rem 3.5rem">
          Pick up your favourite Movie
        </Typography>

        <Grid container sx={{ my: 2, p: 3 }} spacing={4}>
          {movies.map((detail) => (
            <>
              <Grid item xs={3}>
                <MoviePost data={detail} />
              </Grid>
            </>
          ))}
        </Grid>

        <Footer />
      </Stack>
    </>
  );
}
