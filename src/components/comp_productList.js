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
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getUserPosts } from "../services/posts";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PreLoader } from "../components/basic/PreLoader";
import NotFoundImage from "../assets/not-found.svg";

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
    marginBottom: 20,
    borderRadius:10
  },
  productListItemImage: {
    minHeight: 80,
    maxHeight: 100,
  },
  productListItemHeader: {
    width: "100%",
    textAlign: "left",
  },
  notFoundImage: {
    width: "100%",
    maxWidth: "150px",
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid container style={{ position: "relative" }}>
      <Link
        to={`/product/view/${post.postId}`}
        style={{ textDecoration: "none", width: "100%" }}
      >
        <Controls.Card className={classes.productListcard}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <CardMedia style={{ margin: 10 }} title={post.title}>
                <img
                  src={`${post["imgURL"][0] && post["imgURL"][0].url}`}
                  className={classes.productListItemImage}
                />
              </CardMedia>
            </Grid>
            <Grid container item xs={8} alignItems="center">
              <Grid container alignItems="center">
                <CardHeader
                  className={classes.productListItemHeader}
                  title={post.title}
                  subheader={new Date(post.createdAt).toDateString()}
                />
              </Grid>
              <Grid container alignItems="center">
                <Rating
                  className={classes.filterCollapseInputGroup}
                  value={post.rate}
                  name="byRating"
                  precision={0.25}
                  readOnly
                />
                ({post.rate})
              </Grid>
              <CardContent>
                <Grid item xs={12}></Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Controls.Card>
      </Link>
      {/* <IconButton aria-label="settings" style={{position:"absolute", right:20}}>
        <MoreVertIcon />
      </IconButton> */}
    </Grid>
  );
};

export default function ProductListContainer() {
  const classes = useStyles();
  const [myPosts, setMyposts] = useState([]);
  const { userData, setUserData } = useContext(UserContext);
  const [listLoading, setListLoading] = useState(true);

  useEffect(async () => {
    if (userData) {
      let data = await getUserPosts(userData.email);
      if (data) {
        setMyposts(data);
      }
      setListLoading(false);
    }
  }, [userData]);

  return (
    <Grid
      style={{
        height: "70vh",
        overflow: "auto",
        paddingTop: "10px",
        position: "relative",
      }}
      alignContent="flex-start"
      container
    >
      <PreLoader loading={listLoading} />
      {myPosts.length !== 0 ? (
        myPosts.map((post, index) => (
          <Grid key={index} item xs={12} md={12}>
            <ProductCard post={post} />
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
            You haven't post anything yet.
          </Typography>
          <img src={NotFoundImage} className={classes.notFoundImage} />
        </Grid>
      )}
    </Grid>
  );
}
