import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Grid, CardMedia } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

export default function HomePageCarousel(props) {
  var items = [
    {
      img_src: "/bg-img/home-page-img.png",
      msg: "Book your movie tickets and get excited offers",
    },
  ];

  return (
    <Grid item xs={12}>
      <Carousel
        fullHeightHover={true}
        NextIcon={<ArrowForwardOutlinedIcon />}
        PrevIcon={<ArrowBackOutlinedIcon />}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Grid>
  );
}
function Item(props) {
  return (
    <Grid container style={{ padding: "50px" }}>
      <Grid item xs={8}>
        <img
          className="profile-photo"
          src={props.item.img_src}
          alt={"Login Page-Image"}
          width={990}
          height={664}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography
          align="center"
          component="h1"
          variant="h2"
          style={{ marginTop: "150px" }}
        >
          Hurry Up
        </Typography>
        <Typography
          align="center"
          component="h1"
          variant="h6"
          style={{ marginTop: "5px" }}
        >
          {props.item.msg}
          <Button
            style={{
              borderRadius: 30,
              backgroundColor: "#FFFFFF",
              boxShadow: "none",
              color: "#000000",
              fontSize: "18px",
              borderColor: "#FFBF00",
              width: "75%",
            }}
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Book Now
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
}
