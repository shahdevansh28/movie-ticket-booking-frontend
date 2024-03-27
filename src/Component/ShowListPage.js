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
import ShowList from "./ShowList";

export default function MovieListPage() {
  return (
    <Stack>
      <NavBar />
      <ShowList />
      <Footer />
    </Stack>
  );
}
