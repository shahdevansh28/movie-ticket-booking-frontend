import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export default function Show(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data[0].theater.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          <LocationOnOutlinedIcon />
          {props.data[0].theater.location}
        </Typography>
        {props.data.map((data) => (
          <>
            <Typography variant="body2" color="text.secondary">
              <Link to={`/seatLayout?showId=${data.id}`}>
                <Button
                  variant="outlined"
                  style={{ color: "black", borderColor: "#FFBF00" }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {new Date(data.startTime).toLocaleTimeString()}
                </Button>
              </Link>
            </Typography>
          </>
        ))}
      </CardContent>
    </Card>
  );
}
