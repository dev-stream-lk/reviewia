import {
  Grid,
  ListItemText,
  makeStyles,
  Typography,
  List,
  Link as MuiLink,
  ListItem,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import HeadImage from "../static/img/homepage_head.svg";
import SearchIcon from "@material-ui/icons/Search";
import Footer from "../components/Footer";
import Phone from "../static/img/j7.jpg";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AppleStore from "../static/img/getAppleStore.svg";
import PlayStore from "../static/img/getPlayStore.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getRecentPosts } from "../services/posts";

const useStyles = makeStyles((theme) => ({
  headSection: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(5),
  },
  headHeader: {
    fontWeight: "400 !important",
    fontSize: 50,
  },
  headSubHeader: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(2),
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
        2
      )}px ${theme.spacing(3)}px`,
    },
  },
  headImage: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      marginTop: 150,
      zIndex: -100,
      opacity: 0.3,
      justifyContent: "center",
      "& img": {
        width: "100%",
        height: "100%",
      },
    },
  },
  headSearchInput: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
  },
  trendingSection: {
    marginBottom: 50,
  },
  list: {
    textAlign: "left",
  },

  PopularCategoryLink: {
    border: "none",
    width: "100%",
    textDecoration: "none",
    textAlign: "left",
    paddingLeft: 30,
    cursor: "pointer",
    "&.MuiLink-button": {
      textAlign: "left",
      paddingLeft: theme.spacing(2),
    },
  },
  mostRecentCard: {
    cursor: "pointer",
    "& .MuiCardHeader-title": {
      fontSize: 20,
    },
    "& .MuiCardHeader-subheader": {
      fontSize: 14,
    },
  },
  boxClassName: {
    width: "100%",
    margin: 0,
  },
  divClassName: {
    padding: theme.spacing(1),
  },
  getAppImageSection: {
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      opacity: 0.3,
      "& img": {
        height: 150,
        zIndex: -5,
      },
    },
  },
  getOurAppImages: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: 150,
      height: 50,
      margin: 10,
      zIndex: 5,
    },
  },
  getAppPaperBox: {
    padding: `${theme.spacing(0)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px ${theme.spacing(2)}px`,
  },
}));

const MostRecentCard = (props) => {
  const classes = useStyles();
  let { post } = props;

  return (
    <Grid item xs={6} sm={4} lg={3}>
      <Link
        to={`/product/view/${post.postId}`}
        style={{ textDecoration: "none" }}
      >
        <Controls.Card className={classes.mostRecentCard}>
          <CardHeader title={post.title} subheader="34 Aug, 2021"></CardHeader>
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

const PopularcategoryItem = (props) => {
  const classes = useStyles();
  const { href = "", primary, ...others } = props;

  return (
    <Controls.Paper
      boxClassName={classes.boxClassName}
      divClassName={classes.divClassName}
    >
      <Grid container justifyContent="flex-start">
        <MuiLink
          to="/products/Electronic"
          className={classes.PopularCategoryLink}
          underline="none"
          component={Link}
          {...others}
        >
          <ListItemText
            primary={primary}
            secondary="34553 posts"
            secondaryTypographyProps={{
              style: { marginLeft: 30 },
            }}
          />
          <ArrowForwardIcon
            style={{ position: "absolute", top: 30, right: 30 }}
          />
        </MuiLink>
      </Grid>
    </Controls.Paper>
  );
};

export default function HomePage(props) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const { userData, setUserData } = useContext(UserContext);

  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(async () => {
    if (userData) {
      let data = await getRecentPosts();
      if (data) {
        setRecentPosts(data);
      }
    }
  }, [userData]);

  return (
    <div>
      <Header userData={userData} setUserData={setUserData}></Header>
      {/* Start Head section */}
      <div>
        <Grid container className={classes.headSection}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} lg={7}>
              <Typography
                variant="h2"
                component="div"
                className={classes.headHeader}
              >
                We are here to Help you
              </Typography>
              <Typography
                variant="h6"
                component="div"
                className={classes.headSubHeader}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore
                consectetur, neque doloribus, cupiditate numquam dignissimos
                laborum fugiat deleniti?
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={5} className={classes.headImage}>
              <img src={HeadImage} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Controls.Input
              endAdornment={<SearchIcon />}
              fullWidth={true}
              size="medium"
              className={classes.headSearchInput}
              placeholder="What are you looking for..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Controls.Input>
          </Grid>
        </Grid>
      </div>
      {/* End Head section */}

      {/* Start Trending section */}
      <Grid container className={classes.trendingSection}>
        {/* Start Popular categories */}
        <Grid item xs={12} md={4}>
          <Controls.Paper>
            <Typography variant="h4" component="div">
              Popular Categories
            </Typography>

            <List className={classes.list}>
              {[
                "Electronics",
                "vehicle",
                "category-01",
                "category-02",
                "category-03",
                "category-04",
              ].map((item, index) => (
                <ListItem key={index}>
                  <PopularcategoryItem href={index} primary={item} />
                </ListItem>
              ))}
            </List>
          </Controls.Paper>
        </Grid>
        {/* End Popular categories */}

        {/* Start Most view  */}
        <Grid item xs={12} md={8}>
          <Controls.Paper>
            <Grid container spacing={2}>
              <Grid container justifyContent="center">
                <Typography variant="h4" component="div">
                  Most Recent Posts
                </Typography>
              </Grid>
              {recentPosts.length !== 0
                ? recentPosts.map((item, i) => (
                    <MostRecentCard key={i} post={item} />
                  ))
                : null}
            </Grid>
          </Controls.Paper>
        </Grid>
        {/* End Most view  */}
      </Grid>

      {/* End Trending section */}

      {/* Start get our app */}
      <Controls.Paper boxClassName={classes.getAppPaperBox}>
        <Grid container style={{ padding: 10 }}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" component="div">
              Get Our Android and Iso App
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ marginTop: 30 }}
            >
              Now Our Mobile app available.
            </Typography>
            <div className={classes.getOurAppImages}>
              <img style={{ cursor: "pointer" }} src={AppleStore} />
              <img style={{ cursor: "pointer" }} src={PlayStore} />
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className={classes.getAppImageSection}>
            <img src={Phone} />
          </Grid>
        </Grid>
      </Controls.Paper>

      {/* End get our app */}
      <Footer></Footer>
    </div>
  );
}
