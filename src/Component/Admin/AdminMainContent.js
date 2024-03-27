import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Toolbar } from "@mui/material";

export default function AdminMainContent() {
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Movie Ticket Booking
          </Typography>
          <Typography variant="h5" component="div">
            Welcome Admin
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Please be aware of changing information
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
