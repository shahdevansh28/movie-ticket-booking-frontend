import React from "react";
import NavBar from "./NavBar";
import HomePageCarousel from "./HomePageCarousel";
import MovieList from "./MovieList";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
export default function HomePage() {
  return (
    <>
      <Stack>
        <NavBar />
        <HomePageCarousel />
        <MovieList />
        <Footer />
        {/* <Outlet /> */}
      </Stack>
    </>
  );
}
