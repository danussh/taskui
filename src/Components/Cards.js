import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 470,
  },
  media: {
    height: 140,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cards = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    Axios.get(
      "https://gofloaters.firebaseapp.com/spaces/incity?city=Chennai&lat=12.9653652&lng=80.2461057"
    )
      .then((resp) => {
        const data = Object.values(resp.data);
        console.log(data);
        setdata(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex">
      {data.map((data, index) => {
        return (
          <div className="flexitem">
            <Card className={classes.root} key={index}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={data.photos[0]}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h1">
                    {data.originalName}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="p">
                    Near : {data.address.landmark}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="p">
                    Space : {data.spaceType}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="p">
                    Facilities: {data.facilitiesList[0]},{" "}
                    {data.facilitiesList[1]}, {data.facilitiesList[2]},{" "}
                    {data.facilitiesList[3]}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  View Details.
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">
                    {" Additional Features :"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <h4>
                        Address:{" "}
                        <span>
                          `${data.address.street},${data.address.zipcode}`
                        </span>
                      </h4>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      <h4>
                        Descprition: <span>`{data.spaceDesc}`</span>
                      </h4>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      <h4>
                        Operational Time: <span>{data.operationTime}</span>
                      </h4>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                      <h4>
                        Seats Available: <span>{data.seatsAvailable}</span>
                      </h4>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button variant="contained" color="secondary">
                  Book
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
