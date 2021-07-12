import {
  Grid,
  makeStyles,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
} from "@material-ui/core";
import React from "react";
import Controls from "../components/Controls";
import Phone from "../static/img/j7.jpg";
import MoreVertIcon from "@material-ui/icons/MoreVert";


const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(5),
  },
  productContainer: {
    textAlign: "start",
  },
  productListcard: {
    width: "100%",
    backgroundColor: "#CCDEF5",
  },
  productListItemImage: {
    minHeight: 80,
    maxHeight: 150,
  },
  productListItemHeader: {
    width: "100%",
    textAlign: "left",
  },
}));


const ProductCard = (props) => {
  const classes = useStyles();

  return (
    <Controls.Card className={classes.productListcard}>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia title="Samsung j7 nxt">
            <img src={Phone} className={classes.productListItemImage} />
          </CardMedia>
        </Grid>
        <Grid container item xs={8}>
          <Grid container>
            <CardHeader
              className={classes.productListItemHeader}
              avatar={<Avatar aria-label="recipe">R</Avatar>}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Galaxy j7 nxt"
              subheader="September 14, 2016"
            />
          </Grid>
          <Grid container alignItems="center">
            {/* <Rating
              className={classes.filterCollapseInputGroup}
              value={rating}
              name="byRating"
              precision={0.25}
              onChange={(e, value) => setRating(value)}
              readOnly
            /> */}
          </Grid>
          <CardContent>
            <Grid item xs={12}></Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Controls.Card>
  );
};

export default function ProductListContainer() {
    return (
      <Grid
        item
        xs={12}
        style={{
          // maxHeight: "100vh",
          height: "75vh",
          overflow: "auto",
          paddingTop: "10px",
        }}
        container
        spacing={3}
      >
        {[1, 2, 3, 4, 5].map((i, index) => (
          <Grid key={index} item xs={12} md={12}>
            <ProductCard />
          </Grid>
        ))}
      </Grid>
    );
}