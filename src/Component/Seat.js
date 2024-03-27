import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import ChairIcon from "@mui/icons-material/Chair";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

export default function Seat(props) {
  const onClick = () => {
    props.sendData(props);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {props.data.isAvailable ? (
            <Button onClick={onClick}>
              <ChairOutlinedIcon fontSize="large" />
            </Button>
          ) : (
            <Button>
              <ChairIcon fontSize="large" />
            </Button>
          )}
          {props.data.row},{props.data.number}
        </Grid>
      </Grid>
    </>
  );
}
