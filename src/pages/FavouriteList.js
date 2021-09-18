import React, { useContext, useEffect } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { UserContext } from "../context/UserContext";
import { FavContext, refreshContext } from "../context/FavoriteList";
import { getFavouriteList } from "../services/favouritelist";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: `${theme.spacing(5)}px 0px ${theme.spacing(5)}px 0px`,
    minHeight: "68vh",
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      margin: `${theme.spacing(5)}px ${theme.spacing(1)}px ${theme.spacing(
        5
      )}px ${theme.spacing(1)}px`,
    },
  },
  postContainer: {
    padding: theme.spacing(2),
  },
}));

const FavouriteCard = (props) => {
  const classes = useStyles();
  let { post } = props;

  return (
    <Grid item xs={6} sm={4} lg={3}>
      <Link
        to={`/product/view/${post.postId}`}
        style={{ textDecoration: "none" }}
      >
        <Controls.Card className={classes.mostRecentCard}>
          <CardHeader
            title={post.title}
            subheader={new Date(post.createdAt).toDateString()}
          ></CardHeader>
          <CardMedia title={post.title}>
            <img
              style={{ maxWidth: 200, maxHeight: 200 }}
              src={`${post.imgURL.length === 0 ? "" : post.imgURL[0].url}`}
            />
          </CardMedia>
          <CardContent>
            <Rating
              name="phone"
              value={post.rate}
              precision={0.25}
              getLabelText={(val) => `${val} Heart${val !== 1 ? "s" : ""}`}
              readOnly
            />
            <Box>{post.rate}</Box>
          </CardContent>
          <CardActions></CardActions>
        </Controls.Card>
      </Link>
    </Grid>
  );
};

export default function FavouriteList() {
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  var favList = useContext(FavContext);

  return (
    <div>
      <Header />
      <div className={classes.mainDiv}>
        <Grid container justifyContent="center">
          <Typography variant="h4">Favourite List</Typography>
        </Grid>
        <Grid container className={classes.postContainer}>
          {favList && favList.length !== 0 ? (
            favList.map((post, i) => <FavouriteCard post={post} />)
          ) : (
            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
              <Grid container justifyContent="center">
                <Typography variant="subtitle2" color="secondary">
                  Favourite post not found..
                </Typography>
              </Grid>
              <Grid container justifyContent="center" style={{ marginTop: 10 }}>
                <Controls.Button to={"/products"} component={Link}>
                  Find Post <DoubleArrowIcon style={{ marginLeft: 10 }} />
                </Controls.Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
