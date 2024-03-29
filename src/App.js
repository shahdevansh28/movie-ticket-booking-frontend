import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Component/SignUp";
import SeatLayout from "./Component/SeatLayout";
import ConfirmationPage from "./Component/ConfirmationPage";
import SignIn from "./Component/SignIn";
import HomePage from "./Component/HomePage";
import AdminPage from "./Component/Admin/AdminPage";
import Theater from "./Component/Theater/Theater";
import AdminMainContent from "./Component/Admin/AdminMainContent";
import Movie from "./Component/Movie/Movie";
import ShowTime from "./Component/ShowTime/ShowTime";
import SeatLayoutAdmin from "./Component/SeatLayout/SeatLayoutAdmin";
import CreateAdmin from "./Component/Admin/CreateAdmin";
import UpdateMovie from "./Component/Movie/UpdateMovie";
import Bookings from "./Component/Bookings/Bookings";
import UserProfile from "./Component/Users/UserProfile";
import UpdateTheater from "./Component/Theater/UpdateTheater";
import VerificationCode from "./Component/VerificationCode";
import UpdateShowTime from "./Component/ShowTime/UpdateShowTime";
import MovieListPage from "./Component/MovieListPage";
import ShowListPage from "./Component/ShowListPage";
import PageNotFound from "./Component/PageNotFound";
import { useEffect, useState } from "react";
import Loader from "./Component/Loader";
import axios from "axios";

function App() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        setLoad(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (config) => {
        setLoad(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <Loader show={load} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verify-code" element={<VerificationCode />} />
        <Route path="Profile" element={<UserProfile />} />
        <Route path="/movies" element={<MovieListPage />} />
        <Route path="/showList" element={<ShowListPage />} />
        <Route path="/seatLayout" element={<SeatLayout />} />
        <Route path="/confirm-booking" element={<ConfirmationPage />} />
        <Route path="admin" element={<AdminPage />}>
          <Route index element={<AdminMainContent />} />
          <Route path="Theater" element={<Theater />} />
          <Route path="Theater/update" element={<UpdateTheater />} />
          <Route path="Movies" element={<Movie />} />
          <Route path="Movies/update" element={<UpdateMovie />} />
          <Route path="ShowTime" element={<ShowTime />} />
          <Route path="ShowTime/update" element={<UpdateShowTime />} />
          <Route path="SeatLayout" element={<SeatLayoutAdmin />} />
          <Route path="Create-Admin" element={<CreateAdmin />} />
          <Route path="Bookings" element={<Bookings />} />
          <Route path="My-Profile" element={<UserProfile />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="theaters" element={<MovieList />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="verify-code" element={<VerificationCode />} />
          <Route path="showlist" element={<ShowList />} />
          <Route path="seatLayout" element={<SeatLayout />} />
          <Route path="confirm-booking" element={<ConfirmationPage />} />
          <Route path="Profile" element={<UserProfile />} />
          <Route path="admin" element={<AdminPage />}>
            <Route index element={<AdminMainContent />} />
            <Route path="Theater" element={<Theater />} />
            <Route path="Theater/update" element={<UpdateTheater />} />
            <Route path="Movies" element={<Movie />} />
            <Route path="Movies/update" element={<UpdateMovie />} />
            <Route path="ShowTime" element={<ShowTime />} />
            <Route path="ShowTime/update" element={<UpdateShowTime />} />
            <Route path="SeatLayout" element={<SeatLayoutAdmin />} />
            <Route path="Create-Admin" element={<CreateAdmin />} />
            <Route path="Bookings" element={<Bookings />} />
            <Route path="My-Profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter> */
}
