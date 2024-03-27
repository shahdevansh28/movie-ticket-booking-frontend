import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import ShowList from "../ShowList";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import AdminMainContent from "./AdminMainContent";
import AdminSidePannel from "./AdminSidePannel";
import { Grid, Stack } from "@mui/material";
export default function AdminPage() {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <AdminSidePannel />
      </Stack>
    </>
  );
}
