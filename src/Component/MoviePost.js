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
import ShowList from "./ShowList";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function MoviePost(props) {
  let currentDate = new Date(props.data.release_Date).toDateString();
  //const navigate =useNavigate();

  // const handelClick = () =>{
  //   navigate("")
  // }
  console.log(props.data.id);

  return (
    <Grid item padding="10px">
      <Card
        sx={{
          pt: "4",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor:"transparent" 
        }}
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image="https://source.unsplash.com/random?wallpapers"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.title}
          </Typography>
          <Typography>
            <CalendarMonthIcon fontSize="small" />
            {new Date(props.data.release_Date).toDateString()}
            <br />
            <AccessTimeIcon fontSize="small" />
            {props.data.duration} min
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/showList?movieId=${props.data.id}`}>
            <Button
              style={{
                borderRadius: 30,
                backgroundColor: "#FFBF00",
                fontSize: "18px",
                boxShadow :"none"
              }}
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Book Ticket
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
