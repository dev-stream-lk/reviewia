import {  Grid, makeStyles, Typography, Button, IconButton, Tooltip, } from "@material-ui/core";
import React from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Review from "../components/Review";
import FavoriteBorderSharp from "@material-ui/icons/FavoriteBorderSharp";
import CompareSharp from "@material-ui/icons/CompareSharp";
import GroupAddSharp from "@material-ui/icons/GroupAddSharp";
import Rating from "@material-ui/lab/Rating";
import { Skeleton } from "@material-ui/lab";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(5),
  },
  reviewContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  productContainer: {
    textAlign: "start",
  },
}));

const ProductView = (props) => {
  const classes = useStyles();
  const {userData, setUserData} = props;

  return (
    <div>
      <Header  userData={userData} setUserData={setUserData} />
      <div className={classes.mainDiv}>
        <Grid container className={classes.productContainer}>
          {/* LHS */}
          <Grid item xs={12} sm={5}>
            <Grid container justify="center">
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Skeleton width={400} height={400} />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Rating />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography variant="h5">4.7</Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
              <Tooltip title="Add to Favourites" aria-label="add" arrow>
              <IconButton
                  color="primary"
                  aria-label="Add to favourite"
                  component="span"
                >
                  <FavoriteBorderSharp />
                </IconButton>
              </Tooltip>
              <Tooltip title="Compare" aria-label="add" arrow>
              <Link to={{pathname:"/product/compare"}} >
                <IconButton
                    color="primary"
                    aria-label="Add to favourite"
                    component="span"
                  >
                    <CompareSharp />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title="Create Instant Group" aria-label="add" arrow>
              <Link to={{pathname:"/product/instantGroup"}}>
                <IconButton
                    color="primary"
                    aria-label="Add to favourite"
                    component="span"
                  >
                    <GroupAddSharp />
                  </IconButton>
                </Link>
              </Tooltip>
              </Grid>
              <Grid item xs={9} direction="column">
                <Controls.Paper>Brand:</Controls.Paper>
                <Controls.Paper>Year:</Controls.Paper>
                <Controls.Paper>Review count:</Controls.Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* RHS */}
          <Grid item xs={12} sm={7}>
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={6}>
                <Typography variant="h5">Product Name</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined">Write a review</Button>
              </Grid>
              <Grid item xs={12}>
                <Controls.Paper className={useStyles.paper}>
                  <Grid container className={classes.reviewContainer}>
                    <Grid item xs={1}>
                      <Typography variant="h5">Reviews</Typography>
                    </Grid>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        style={{
                          // maxHeight: "100vh",
                          height: "75vh",
                          overflow: "auto",
                          paddingTop: "10px",
                        }}
                      >
                        <Review
                          description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                      elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                      rerum inventore consectetur, neque doloribus, cupiditate
                                      numquam dignissimos laborum fugiat deleniti? Eum quasi
                                      quidem quibusdam."
                        />
                        <Review
                          description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                      elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                      rerum inventore consectetur, neque doloribus, cupiditate
                                      numquam dignissimos laborum fugiat deleniti? Eum quasi
                                      quidem quibusdam."
                        />
                        <Review
                          description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                      elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                      rerum inventore consectetur, neque doloribus, cupiditate
                                      numquam dignissimos laborum fugiat deleniti? Eum quasi
                                      quidem quibusdam."
                        />
                        <Review
                          description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                      elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                      rerum inventore consectetur, neque doloribus, cupiditate
                                      numquam dignissimos laborum fugiat deleniti? Eum quasi
                                      quidem quibusdam."
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Controls.Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default ProductView;
